import forge from "node-forge";
import { ITicketStoragePort } from "@application/ports/storage";
import { ArcaServiceName } from "@application/types/service-name.types";
import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { EncryptedTicketStorageConfig } from "@infrastructure/types/ticket-storage.types";

const KEY_LENGTH = 32;
const IV_LENGTH = 12;
const TAG_LENGTH_BITS = 128;
const PREFIX = "enc:v1:";

type CredentialField = "token" | "sign";

// Wraps another storage and encrypts the ticket token and sign with
// AES-256-GCM. The header stays readable: it holds no secret and the wrapped
// storage and core need its expiration time.
export class EncryptedTicketStorage implements ITicketStoragePort {
  private readonly storage: ITicketStoragePort;
  private readonly key: string;

  constructor(config: EncryptedTicketStorageConfig) {
    this.storage = config.storage;
    this.key = parseKey(config.key);
  }

  async save(ticket: AccessTicket, serviceName: ArcaServiceName): Promise<void> {
    const encryptedTicket = AccessTicket.create({
      header: ticket.getHeaders(),
      credentials: {
        token: this.encrypt(ticket.getToken(), serviceName, "token"),
        sign: this.encrypt(ticket.getSign(), serviceName, "sign"),
      },
    });

    await this.storage.save(encryptedTicket, serviceName);
  }

  async get(serviceName: ArcaServiceName): Promise<AccessTicket | null> {
    const storedTicket = await this.storage.get(serviceName);
    if (!storedTicket) return null;

    return AccessTicket.create({
      header: storedTicket.getHeaders(),
      credentials: {
        token: this.decrypt(storedTicket.getToken(), serviceName, "token"),
        sign: this.decrypt(storedTicket.getSign(), serviceName, "sign"),
      },
    });
  }

  async delete(serviceName: ArcaServiceName): Promise<void> {
    await this.storage.delete(serviceName);
  }

  private encrypt(
    value: string,
    serviceName: ArcaServiceName,
    field: CredentialField,
  ): string {
    const iv = forge.random.getBytesSync(IV_LENGTH);
    const cipher = forge.cipher.createCipher("AES-GCM", this.key);
    cipher.start({
      iv,
      additionalData: `${serviceName}:${field}`,
      tagLength: TAG_LENGTH_BITS,
    });
    cipher.update(forge.util.createBuffer(value, "utf8"));
    cipher.finish();

    const payload = cipher.output.getBytes() + cipher.mode.tag.getBytes();
    return `${PREFIX}${forge.util.encode64(iv)}:${forge.util.encode64(payload)}`;
  }

  private decrypt(
    value: string,
    serviceName: ArcaServiceName,
    field: CredentialField,
  ): string {
    // Tickets saved before encryption was enabled are read as they are and
    // stored encrypted on the next renewal.
    if (!value.startsWith(PREFIX)) return value;

    const [encodedIv, encodedPayload] = value.slice(PREFIX.length).split(":");
    const iv = forge.util.decode64(encodedIv ?? "");
    const payload = forge.util.decode64(encodedPayload ?? "");
    const tagLength = TAG_LENGTH_BITS / 8;
    const decryptionError = new Error(
      `Failed to decrypt the WSAA ticket ${field} for ${serviceName}: wrong key or tampered data`,
    );
    if (iv.length !== IV_LENGTH || payload.length <= tagLength) {
      throw decryptionError;
    }

    const decipher = forge.cipher.createDecipher("AES-GCM", this.key);
    decipher.start({
      iv,
      additionalData: `${serviceName}:${field}`,
      tagLength: TAG_LENGTH_BITS,
      tag: forge.util.createBuffer(payload.slice(-tagLength)),
    });
    decipher.update(forge.util.createBuffer(payload.slice(0, -tagLength)));

    if (!decipher.finish()) {
      throw decryptionError;
    }

    return forge.util.decodeUtf8(decipher.output.getBytes());
  }
}

function parseKey(key: string | Uint8Array): string {
  const bytes =
    typeof key === "string"
      ? forge.util.decode64(key)
      : forge.util.binary.raw.encode(key);

  if (bytes.length !== KEY_LENGTH) {
    throw new Error(
      `EncryptedTicketStorage key must be ${KEY_LENGTH} bytes (a Uint8Array or a base64 string); got ${bytes.length}`,
    );
  }

  return bytes;
}
