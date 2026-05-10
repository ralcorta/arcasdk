#!/usr/bin/env node

/**
 * Generate TypeScript SOAP interfaces from WSDL files using wsdl-to-ts.
 *
 * Usage: npm run generate:soap-interfaces
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const wsdlDir = path.join(
  __dirname,
  "../src/infrastructure/outbound/adapters/soap/wsdl",
);

const interfacesDir = path.join(
  __dirname,
  "../src/infrastructure/outbound/ports/soap/interfaces",
);

// WSDL file → output folder/file mapping.
// Only test WSDLs (production ones generate identical interfaces).
// `sections` maps wsdl-to-ts `-- Section --` headers to output targets.
const WSDL_CONFIGS = [
  // {
  //   wsdl: "wsfe.wsdl",
  //   sections: {
  //     "Service/ServiceSoap": { folder: "Service", file: "ServiceSoap.ts" },
  //     "Service/ServiceSoap12": { folder: "Service", file: "ServiceSoap12.ts" },
  //   },
  // },
  {
    wsdl: "wsfex.wsdl",
    sections: {
      "Service/ServiceSoap": { folder: "FEXService", file: "ServiceSoap.ts" },
      "Service/ServiceSoap12": {
        folder: "FEXService",
        file: "ServiceSoap12.ts",
      },
    },
  },
  {
    wsdl: "wsfecred.wsdl",
    sections: {
      "FECredService/FECredServiceSOAP": {
        folder: "FECredService",
        file: "ServiceSoap.ts",
      },
    },
  },
  // {
  //   wsdl: "wsaa.wsdl",
  //   sections: {
  //     "LoginCMSService/LoginCms": { folder: "LoginCMSService", file: "LoginCms.ts" },
  //   },
  // },
  // {
  //   wsdl: "ws_sr_padron_a4.wsdl",
  //   sections: {
  //     "PersonaServiceA4/PersonaServiceA4Port": { folder: "PersonaServiceA4", file: "PersonaServiceA4Port.ts" },
  //   },
  // },
  // {
  //   wsdl: "ws_sr_padron_a5.wsdl",
  //   sections: {
  //     "PersonaServiceA5/PersonaServiceA5Port": { folder: "PersonaServiceA5", file: "PersonaServiceA5Port.ts" },
  //   },
  // },
  // {
  //   wsdl: "ws_sr_inscription_proof.wsdl",
  //   sections: {
  //     "PersonaServiceA5/PersonaServiceA5Port": { folder: "PersonaServiceInscriptionProof", file: "PersonaServiceInscriptionProofPort.ts" },
  //   },
  // },
  // {
  //   wsdl: "ws_sr_padron_a10.wsdl",
  //   sections: {
  //     "PersonaServiceA10/PersonaServiceA10Port": { folder: "PersonaServiceA10", file: "PersonaServiceA10Port.ts" },
  //   },
  // },
  // {
  //   wsdl: "ws_sr_padron_a13.wsdl",
  //   sections: {
  //     "PersonaServiceA13/PersonaServiceA13Port": { folder: "PersonaServiceA13", file: "PersonaServiceA13Port.ts" },
  //   },
  // },
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
// XML Schema types that don't exist in TypeScript → number
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

// XSD types that map to string
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
    if (/^\s+(Auth|authRequest)\s*:/.test(lines[i])) {
      if (lines[i].includes("{")) {
        // Multiline block — skip until matching closing brace
        let braceCount = 0;
        do {
          for (const ch of lines[i]) {
            if (ch === "{") braceCount++;
            if (ch === "}") braceCount--;
          }
          i++;
        } while (braceCount > 0 && i < lines.length);
      } else {
        // Single-line field — skip this line
        i++;
      }
    } else {
      result.push(lines[i]);
      i++;
    }
  }

  return result.join("\n");
}

function fixTypes(content) {
  let fixed = content
    .replace(XSD_REGEX, ": number")
    .replace(XSD_STRING_REGEX, ": string")
    // Fix trailing '>' on valid TS types (wsdl-to-ts artifact from XSD restrictions)
    .replace(/:\s*(string|number|boolean)>/g, ": $1");

  // Make the main client interface extend Client and add *Async methods
  fixed = fixed.replace(
    /export interface (I\w+Soap)\s*\{/,
    (match, ifaceName) => {
      return `export interface ${ifaceName} extends Client {`;
    },
  );

  // For each callback method, add an Async version that returns Promise
  // Pattern: methodName: (input: IType, cb: ...) => void;
  const asyncMethods = [];
  const methodRegex =
    /^\s{4}(\w+):\s*\(input:\s*([\w.]+),\s*cb:.*?\)\s*=>\s*void;/gm;
  let m;
  while ((m = methodRegex.exec(fixed)) !== null) {
    const [, methodName, inputType] = m;
    const outputType = inputType.replace("Input", "Output");
    asyncMethods.push(
      `    ${methodName}Async: (input: ${inputType}) => Promise<[${outputType}, string, {[k: string]: any}, any]>;`,
    );
  }

  if (asyncMethods.length > 0) {
    // Insert async methods before the closing brace of the client interface
    const lastBrace = fixed.lastIndexOf("}");
    const beforeNamespace = fixed.lastIndexOf("export namespace");
    const insertPos =
      beforeNamespace > 0 ? fixed.lastIndexOf("}", beforeNamespace) : lastBrace;

    // Find the correct closing brace of the client interface
    const ifaceMatch = fixed.match(
      /export interface I\w+Soap extends Client \{/,
    );
    if (ifaceMatch) {
      const ifaceStart = fixed.indexOf(ifaceMatch[0]);
      let braceCount = 0;
      let ifaceEnd = -1;
      for (let i = ifaceStart; i < fixed.length; i++) {
        if (fixed[i] === "{") braceCount++;
        if (fixed[i] === "}") {
          braceCount--;
          if (braceCount === 0) {
            ifaceEnd = i;
            break;
          }
        }
      }
      if (ifaceEnd > 0) {
        fixed =
          fixed.slice(0, ifaceEnd) +
          "\n" +
          asyncMethods.join("\n") +
          "\n" +
          fixed.slice(ifaceEnd);
      }
    }
  }

  // Add imports at top
  const hasClient = fixed.includes("extends Client");
  if (hasClient) {
    fixed = 'import { Client } from "soap";\n' + fixed;
  }

  return fixed;
}

function generate() {
  for (const config of WSDL_CONFIGS) {
    const wsdlPath = path.join(wsdlDir, config.wsdl);

    if (!fs.existsSync(wsdlPath)) {
      console.warn(`WSDL not found, skipping: ${config.wsdl}`);
      continue;
    }

    console.log(`Processing ${config.wsdl}`);

    const raw = execSync(`npx wsdl-to-ts "${wsdlPath}"`, { encoding: "utf-8" });
    const sections = parseSections(raw);

    for (const [sectionName, target] of Object.entries(config.sections)) {
      const content = sections.get(sectionName);
      if (!content) {
        console.warn(`  Section "${sectionName}" not found in ${config.wsdl}`);
        continue;
      }

      const outDir = path.join(interfacesDir, target.folder);
      fs.mkdirSync(outDir, { recursive: true });

      const outFile = path.join(outDir, target.file);
      const fixed = removeAuthFields(fixTypes(content));
      fs.writeFileSync(outFile, fixed, "utf-8");
      console.log(`  -> ${target.folder}/${target.file}`);
    }
  }
}

generate();
