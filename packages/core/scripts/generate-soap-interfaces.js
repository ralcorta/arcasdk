#!/usr/bin/env node

/**
 * Generate TypeScript SOAP interfaces from WSDL files using wsdl-to-ts.
 *
 * Splits each section into:
 * - application/dto/<pkg>/<dtoFile> — Input/Output interfaces + namespace (no soap Client)
 * - infrastructure/soap/contracts/<folder>/<file> — client interface extends Client + *Async
 *
 * Usage (from packages/core): npm run generate:soap-interfaces
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const coreRoot = path.join(__dirname, "..");
const wsdlDir = path.join(coreRoot, "src/infrastructure/soap/wsdl");
const interfacesDir = path.join(coreRoot, "src/infrastructure/soap/contracts");
const applicationDtoDir = path.join(coreRoot, "src/application/dto");

const CLIENT_INTERFACE_REGEX = /^export interface (I[\w]+(?:Soap|PortSoap))\s*\{/;

const WSDL_CONFIGS = [
  {
    wsdl: "wsfe.wsdl",
    dtoPackage: "electronic-billing",
    sections: {
      "Service/ServiceSoap": {
        folder: "Service",
        file: "ServiceSoap.ts",
        dtoFile: "wsfe-service-soap.types.ts",
      },
      "Service/ServiceSoap12": {
        folder: "Service",
        file: "ServiceSoap12.ts",
        dtoFile: "wsfe-service-soap12.types.ts",
      },
    },
  },
  {
    wsdl: "wsfex.wsdl",
    dtoPackage: "fex",
    sections: {
      "Service/ServiceSoap": {
        folder: "FEXService",
        file: "ServiceSoap.ts",
        dtoFile: "service-soap.types.ts",
      },
      "Service/ServiceSoap12": {
        folder: "FEXService",
        file: "ServiceSoap12.ts",
        dtoFile: "service-soap12.types.ts",
      },
    },
  },
  {
    wsdl: "wsfecred.wsdl",
    dtoPackage: "fecred",
    sections: {
      "FECredService/FECredServiceSOAP": {
        folder: "FECredService",
        file: "ServiceSoap.ts",
        dtoFile: "service-soap.types.ts",
      },
    },
  },
  {
    wsdl: "wsaa.wsdl",
    dtoPackage: "authentication",
    sections: {
      "LoginCMSService/LoginCms": {
        folder: "LoginCMSService",
        file: "LoginCms.ts",
        dtoFile: "login-cms.types.ts",
      },
    },
  },
  {
    wsdl: "ws_sr_padron_a4.wsdl",
    dtoPackage: "register",
    sections: {
      "PersonaServiceA4/PersonaServiceA4Port": {
        folder: "PersonaServiceA4",
        file: "PersonaServiceA4Port.ts",
        dtoFile: "persona-service-a4.types.ts",
      },
    },
  },
  {
    wsdl: "ws_sr_padron_a5.wsdl",
    dtoPackage: "register",
    sections: {
      "PersonaServiceA5/PersonaServiceA5Port": {
        folder: "PersonaServiceA5",
        file: "PersonaServiceA5Port.ts",
        dtoFile: "persona-service-a5.types.ts",
      },
    },
  },
  {
    wsdl: "ws_sr_inscription_proof.wsdl",
    dtoPackage: "register",
    sections: {
      "PersonaServiceA5/PersonaServiceA5Port": {
        folder: "PersonaServiceInscriptionProof",
        file: "PersonaServiceInscriptionProofPort.ts",
        dtoFile: "persona-service-inscription-proof.types.ts",
      },
    },
  },
  {
    wsdl: "ws_sr_padron_a10.wsdl",
    dtoPackage: "register",
    sections: {
      "PersonaServiceA10/PersonaServiceA10Port": {
        folder: "PersonaServiceA10",
        file: "PersonaServiceA10Port.ts",
        dtoFile: "persona-service-a10.types.ts",
      },
    },
  },
  {
    wsdl: "ws_sr_padron_a13.wsdl",
    dtoPackage: "register",
    sections: {
      "PersonaServiceA13/PersonaServiceA13Port": {
        folder: "PersonaServiceA13",
        file: "PersonaServiceA13Port.ts",
        dtoFile: "persona-service-a13.types.ts",
      },
    },
  },
];

function parseSections(raw) {
  const sections = new Map();
  const lines = raw.split("\n");
  let currentSection = null;
  let currentLines = [];

  for (const line of lines) {
    const match = line.match(/^-- (.+) --$/);
    if (match) {
      if (currentSection) {
        sections.set(currentSection, currentLines.join("\n"));
      }
      currentSection = match[1];
      currentLines = [];
    } else if (currentSection) {
      currentLines.push(line);
    }
  }
  if (currentSection) {
    sections.set(currentSection, currentLines.join("\n"));
  }
  return sections;
}

const XSD_NUMBER_TYPES = [
  "long",
  "short",
  "int",
  "float",
  "double",
  "decimal",
  "byte",
  "unsignedInt",
  "unsignedLong",
  "unsignedShort",
  "unsignedByte",
];
const XSD_REGEX = new RegExp(`:\\s*(${XSD_NUMBER_TYPES.join("|")})\\s*>?`, "g");

const XSD_STRING_TYPES = ["date", "dateTime", "time"];
const XSD_STRING_REGEX = new RegExp(
  `:\\s*(${XSD_STRING_TYPES.join("|")})\\b`,
  "g",
);

function removeAuthFields(content) {
  const lines = content.split("\n");
  const result = [];
  let i = 0;

  while (i < lines.length) {
    if (/^\s+(Auth|authRequest|token|sign|cuitRepresentada)\s*:/.test(lines[i])) {
      if (lines[i].includes("{")) {
        let braceCount = 0;
        do {
          for (const ch of lines[i]) {
            if (ch === "{") braceCount++;
            if (ch === "}") braceCount--;
          }
          i++;
        } while (braceCount > 0 && i < lines.length);
      } else {
        i++;
      }
    } else {
      result.push(lines[i]);
      i++;
    }
  }

  return result.join("\n");
}

function fixWsdlTypes(content) {
  return content
    .replace(XSD_REGEX, ": number")
    .replace(XSD_STRING_REGEX, ": string")
    .replace(/:\s*(string|number|boolean)>/g, ": $1");
}

function stripWsdlFieldComments(content) {
  return content
    .replace(/^\s*\/\*\* http:\/\/[^\n]+\*\/\s*\n/gm, "")
    .replace(
      /^\s*\/\*\* (?:xsd|s):\s*(?:string|number|boolean)\(undefined\) \*\/\s*\n/gm,
      "",
    );
}

function findClientInterfaceBounds(lines) {
  const clientIndex = lines.findIndex((line) =>
    CLIENT_INTERFACE_REGEX.test(line),
  );
  if (clientIndex === -1) {
    throw new Error("SOAP client interface not found in WSDL section");
  }

  let braceCount = 0;
  let clientEnd = -1;
  for (let i = clientIndex; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === "{") braceCount++;
      if (ch === "}") braceCount--;
    }
    if (braceCount === 0 && i > clientIndex) {
      clientEnd = i;
      break;
    }
  }
  if (clientEnd === -1) {
    throw new Error("Could not find end of SOAP client interface");
  }

  return { clientIndex, clientEnd };
}

function splitDtoAndClient(content) {
  const lines = content.split("\n");
  const { clientIndex, clientEnd } = findClientInterfaceBounds(lines);

  const dtoBody = [
    ...lines.slice(0, clientIndex),
    ...lines.slice(clientEnd + 1),
  ]
    .join("\n")
    .trimEnd();

  const clientBody = lines.slice(clientIndex, clientEnd + 1).join("\n");

  return { dtoBody, clientBody };
}

function collectReferencedTypes(clientContent) {
  const types = new Set();
  for (const match of clientContent.matchAll(/\b(I[A-Za-z0-9_]+)\b/g)) {
    const name = match[1];
    if (name.endsWith("Input") || name.endsWith("Output")) {
      types.add(name);
    }
  }
  return [...types].sort();
}

function buildClientInterface(clientBody, dtoImportPath) {
  const withExtends = clientBody.replace(
    CLIENT_INTERFACE_REGEX,
    "export interface $1 extends Client {",
  );

  const asyncMethods = [];
  const methodRegex =
    /^\s{4}(\w+):\s*\(input:\s*([\w.]+),\s*cb:.*?\)\s*=>\s*void;/gm;
  let match;
  while ((match = methodRegex.exec(withExtends)) !== null) {
    const [, methodName, inputType] = match;
    const outputType = inputType.replace("Input", "Output");
    asyncMethods.push(
      `    ${methodName}Async: (input: ${inputType}) => Promise<[${outputType}, string, {[k: string]: any}, any]>;`,
    );
  }

  let clientWithAsync = withExtends;
  if (asyncMethods.length > 0) {
    const ifaceMatch = clientWithAsync.match(
      /export interface I[\w]+(?:Soap|PortSoap) extends Client \{/,
    );
    if (ifaceMatch) {
      const ifaceStart = clientWithAsync.indexOf(ifaceMatch[0]);
      let braceCount = 0;
      let ifaceEnd = -1;
      for (let i = ifaceStart; i < clientWithAsync.length; i++) {
        if (clientWithAsync[i] === "{") braceCount++;
        if (clientWithAsync[i] === "}") {
          braceCount--;
          if (braceCount === 0) {
            ifaceEnd = i;
            break;
          }
        }
      }
      if (ifaceEnd > 0) {
        clientWithAsync =
          clientWithAsync.slice(0, ifaceEnd) +
          "\n" +
          asyncMethods.join("\n") +
          "\n" +
          clientWithAsync.slice(ifaceEnd);
      }
    }
  }

  const referencedTypes = collectReferencedTypes(clientWithAsync);
  const typeImports =
    referencedTypes.length > 0
      ? `import type {\n  ${referencedTypes.join(",\n  ")},\n} from "${dtoImportPath}";\n\n`
      : "";

  return `${typeImports}import { Client } from "soap";\n\n${clientWithAsync}\n`;
}

function writeGeneratedFile(filePath, header, body) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${header}\n${body}\n`, "utf-8");
}

const DTO_HEADER = `/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */`;

function generate() {
  for (const config of WSDL_CONFIGS) {
    const wsdlPath = path.join(wsdlDir, config.wsdl);

    if (!fs.existsSync(wsdlPath)) {
      console.warn(`WSDL not found, skipping: ${config.wsdl}`);
      continue;
    }

    console.log(`Processing ${config.wsdl}`);

    const raw = execSync(`npx wsdl-to-ts "${wsdlPath}"`, {
      encoding: "utf-8",
      cwd: coreRoot,
    });
    const sections = parseSections(raw);

    for (const [sectionName, target] of Object.entries(config.sections)) {
      const content = sections.get(sectionName);
      if (!content) {
        console.warn(`  Section "${sectionName}" not found in ${config.wsdl}`);
        continue;
      }

      const normalized = stripWsdlFieldComments(
        fixWsdlTypes(removeAuthFields(content)),
      );
      const { dtoBody, clientBody } = splitDtoAndClient(normalized);

      const dtoImportPath = `@application/dto/${config.dtoPackage}/${target.dtoFile.replace(/\.ts$/, "")}`;
      const dtoOutFile = path.join(
        applicationDtoDir,
        config.dtoPackage,
        target.dtoFile,
      );
      writeGeneratedFile(dtoOutFile, DTO_HEADER, dtoBody);
      console.log(
        `  -> application/dto/${config.dtoPackage}/${target.dtoFile}`,
      );

      const clientHeader = `/**
 * SOAP client interface (generated). DTOs: ${dtoImportPath}
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "${dtoImportPath}";

`;
      const clientOutFile = path.join(
        interfacesDir,
        target.folder,
        target.file,
      );
      const clientContent =
        clientHeader + buildClientInterface(clientBody, dtoImportPath);
      fs.mkdirSync(path.dirname(clientOutFile), { recursive: true });
      fs.writeFileSync(clientOutFile, clientContent, "utf-8");
      console.log(`  -> ${target.folder}/${target.file}`);
    }
  }
}

function cleanup() {
  const tmpDirs = [
    path.join(coreRoot, ".tmp-wsdl-types"),
    path.join(coreRoot, "wsdl"),
    path.join(coreRoot, "..", "wsdl"),
  ];
  for (const dir of tmpDirs) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`Cleaned up ${path.relative(coreRoot, dir)}/`);
    }
  }
}

generate();
cleanup();
