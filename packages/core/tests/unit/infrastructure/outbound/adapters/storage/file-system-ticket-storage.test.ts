import { FileSystemTicketStorage } from "@arcasdk/core/src/infrastructure/outbound/adapters/storage/file-system-ticket-storage";
import { AccessTicket } from "@arcasdk/core/src/domain/entities/access-ticket.entity";
import { mockLoginCredentials } from "../../../../../mocks/data/credential-json.mock";
import { ServiceNamesEnum } from "@arcasdk/core/src/infrastructure/outbound/ports/soap/enums/service-names.enum";
import { promises as fs } from "fs";
import { resolve } from "path";

jest.mock("fs", () => ({
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn(),
    readFile: jest.fn(),
    access: jest.fn(),
    unlink: jest.fn(),
    constants: {
      F_OK: 0,
      R_OK: 4,
    },
  },
}));

describe("FileSystemTicketStorage", () => {
  let storage: FileSystemTicketStorage;
  const ticketPath = "/tmp/tickets";
  const cuit = 20111111111;
  const production = false;

  beforeEach(() => {
    storage = new FileSystemTicketStorage({
      ticketPath,
      cuit,
      production,
    });
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with provided config", () => {
      const config = {
        ticketPath: "/custom/path",
        cuit: 27123456789,
        production: true,
      };
      const newStorage = new FileSystemTicketStorage(config);
      expect(newStorage).toBeInstanceOf(FileSystemTicketStorage);
    });

    it("should set production to false by default", () => {
      const config = {
        ticketPath: "/custom/path",
        cuit: 27123456789,
      };
      const newStorage = new FileSystemTicketStorage(config);
      expect(newStorage).toBeInstanceOf(FileSystemTicketStorage);
    });
  });

  describe("save", () => {
    it("should save ticket to file system", async () => {
      const ticket = AccessTicket.create(mockLoginCredentials);
      const serviceName = ServiceNamesEnum.WSFE;

      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await storage.save(ticket, serviceName);

      const expectedFileName = `TA-${cuit}-${serviceName}.json`;
      const expectedPath = resolve(ticketPath, expectedFileName);

      expect(fs.mkdir).toHaveBeenCalledWith(ticketPath, { recursive: true });
      expect(fs.writeFile).toHaveBeenCalledWith(
        expectedPath,
        JSON.stringify(
          {
            header: ticket.getHeaders(),
            credentials: ticket.getCredentials(),
          },
          null,
          2
        ),
        "utf8"
      );
    });

    it("should include -production suffix when production is true", async () => {
      const productionStorage = new FileSystemTicketStorage({
        ticketPath,
        cuit,
        production: true,
      });
      const ticket = AccessTicket.create(mockLoginCredentials);
      const serviceName = ServiceNamesEnum.WSFE;

      (fs.mkdir as jest.Mock).mockResolvedValue(undefined);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await productionStorage.save(ticket, serviceName);

      const expectedFileName = `TA-${cuit}-${serviceName}-production.json`;
      const expectedPath = resolve(ticketPath, expectedFileName);

      expect(fs.writeFile).toHaveBeenCalledWith(
        expectedPath,
        expect.any(String),
        "utf8"
      );
    });

    it("should throw error if mkdir fails", async () => {
      const ticket = AccessTicket.create(mockLoginCredentials);
      const serviceName = ServiceNamesEnum.WSFE;
      const error = new Error("Permission denied");

      (fs.mkdir as jest.Mock).mockRejectedValue(error);

      await expect(storage.save(ticket, serviceName)).rejects.toThrow(
        "Failed to create tickets directory: Permission denied"
      );
    });
  });

  describe("get", () => {
    it("should return ticket if file exists and is valid", async () => {
      const serviceName = ServiceNamesEnum.WSFE;
      const ticketData = {
        header: mockLoginCredentials.header,
        credentials: mockLoginCredentials.credentials,
      };
      const fileData = JSON.stringify(ticketData);

      (fs.access as jest.Mock)
        .mockResolvedValueOnce(undefined) // F_OK check
        .mockResolvedValueOnce(undefined); // R_OK check
      (fs.readFile as jest.Mock).mockResolvedValue(fileData);

      const ticket = await storage.get(serviceName);

      expect(ticket).toBeInstanceOf(AccessTicket);
      expect(ticket?.getToken()).toBe(mockLoginCredentials.credentials.token);
      expect(ticket?.getSign()).toBe(mockLoginCredentials.credentials.sign);
    });

    it("should return null if file does not exist", async () => {
      const serviceName = ServiceNamesEnum.WSFE;

      (fs.access as jest.Mock).mockRejectedValueOnce({
        code: "ENOENT",
      });

      const ticket = await storage.get(serviceName);

      expect(ticket).toBeNull();
      expect(fs.readFile).not.toHaveBeenCalled();
    });

    it("should throw error if file access is denied", async () => {
      const serviceName = ServiceNamesEnum.WSFE;

      (fs.access as jest.Mock)
        .mockResolvedValueOnce(undefined) // F_OK check
        .mockRejectedValueOnce({
          code: "EACCES",
          message: "Permission denied",
        }); // R_OK check

      await expect(storage.get(serviceName)).rejects.toThrow(
        "Access denied to ticket file"
      );
    });

    it("should return null if file cannot be read", async () => {
      const serviceName = ServiceNamesEnum.WSFE;

      (fs.access as jest.Mock)
        .mockResolvedValueOnce(undefined) // F_OK check
        .mockResolvedValueOnce(undefined); // R_OK check
      (fs.readFile as jest.Mock).mockRejectedValue({
        code: "EIO",
      });

      const ticket = await storage.get(serviceName);

      expect(ticket).toBeNull();
    });

    it("should throw error if file contains invalid JSON", async () => {
      const serviceName = ServiceNamesEnum.WSFE;
      const invalidJson = "{ invalid json }";

      (fs.access as jest.Mock)
        .mockResolvedValueOnce(undefined) // F_OK check
        .mockResolvedValueOnce(undefined); // R_OK check
      (fs.readFile as jest.Mock).mockResolvedValue(invalidJson);

      await expect(storage.get(serviceName)).rejects.toThrow(
        "Invalid access ticket format"
      );
    });

    it("should throw error if ticket data is invalid", async () => {
      const serviceName = ServiceNamesEnum.WSFE;
      const invalidTicketData = { invalid: "data" };
      const fileData = JSON.stringify(invalidTicketData);

      (fs.access as jest.Mock)
        .mockResolvedValueOnce(undefined) // F_OK check
        .mockResolvedValueOnce(undefined); // R_OK check
      (fs.readFile as jest.Mock).mockResolvedValue(fileData);

      await expect(storage.get(serviceName)).rejects.toThrow(
        "Invalid access ticket format"
      );
    });
  });

  describe("delete", () => {
    it("should delete ticket file", async () => {
      const serviceName = ServiceNamesEnum.WSFE;

      (fs.unlink as jest.Mock).mockResolvedValue(undefined);

      await storage.delete(serviceName);

      const expectedFileName = `TA-${cuit}-${serviceName}.json`;
      const expectedPath = resolve(ticketPath, expectedFileName);

      expect(fs.unlink).toHaveBeenCalledWith(expectedPath);
    });

    it("should not throw error if file does not exist", async () => {
      const serviceName = ServiceNamesEnum.WSFE;

      (fs.unlink as jest.Mock).mockRejectedValue({
        code: "ENOENT",
      });

      await expect(storage.delete(serviceName)).resolves.not.toThrow();
    });

    it("should throw error if deletion fails for other reasons", async () => {
      const serviceName = ServiceNamesEnum.WSFE;
      const error = new Error("Permission denied");

      (fs.unlink as jest.Mock).mockRejectedValue({
        code: "EACCES",
        message: "Permission denied",
      });

      await expect(storage.delete(serviceName)).rejects.toThrow(
        "Failed to delete ticket file: Permission denied"
      );
    });
  });
});

