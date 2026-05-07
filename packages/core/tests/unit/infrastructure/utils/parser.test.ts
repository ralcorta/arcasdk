import { Parser } from "@infrastructure/utils/parser";

describe("Parser", () => {
  describe("xmlToJson", () => {
    it("should convert valid XML to JSON", async () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
        <root>
          <name>John</name>
          <age>30</age>
        </root>`;

      const result = await Parser.xmlToJson<{
        root: { name: string; age: string };
      }>(xml);

      expect(result).toHaveProperty("root");
      expect(result.root).toHaveProperty("name", "John");
      expect(result.root).toHaveProperty("age", "30");
    });

    it("should parse nested XML structures", async () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
        <response>
          <data>
            <user>
              <id>123</id>
              <email>test@example.com</email>
            </user>
          </data>
        </response>`;

      const result = await Parser.xmlToJson<any>(xml);

      expect(result.response.data.user.id).toBe("123");
      expect(result.response.data.user.email).toBe("test@example.com");
    });

    it("should handle XML with attributes", async () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
        <root version="1.0">
          <item id="1">Value</item>
        </root>`;

      const result = await Parser.xmlToJson<any>(xml);

      expect(result.root).toBeDefined();
      expect(result.root.item).toBeDefined();
    });

    it("should handle empty XML elements", async () => {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
        <root>
          <empty></empty>
          <value>test</value>
        </root>`;

      const result = await Parser.xmlToJson<any>(xml);

      expect(result.root).toHaveProperty("value", "test");
    });

    it("should throw error on invalid XML", async () => {
      const invalidXml = `<root><unclosed>`;

      await expect(Parser.xmlToJson(invalidXml)).rejects.toThrow();
    });
  });

  describe("jsonToXml", () => {
    it("should convert JSON object to XML string", () => {
      const obj = {
        root: {
          name: "John",
          age: "30",
        },
      };

      const xml = Parser.jsonToXml(obj);

      expect(xml).toContain("<root>");
      expect(xml).toContain("</root>");
      expect(xml).toContain("John");
      expect(xml).toContain("30");
    });

    it("should convert nested JSON to XML", () => {
      const obj = {
        response: {
          data: {
            user: {
              id: "123",
              email: "test@example.com",
            },
          },
        },
      };

      const xml = Parser.jsonToXml(obj);

      expect(xml).toContain("<response>");
      expect(xml).toContain("</response>");
      expect(xml).toContain("<user>");
      expect(xml).toContain("test@example.com");
    });

    it("should handle arrays in JSON", () => {
      const obj = {
        root: {
          item: ["first", "second", "third"],
        },
      };

      const xml = Parser.jsonToXml(obj);

      expect(xml).toContain("<root>");
      expect(xml).toContain("<item>");
    });

    it("should produce valid XML structure", () => {
      const obj = { root: { data: "test" } };
      const xml = Parser.jsonToXml(obj);

      // Verify it starts with < and ends with >
      expect(xml).toMatch(/^\s*</); // starts with <
      expect(xml).toMatch(/>\s*$/); // ends with >
      expect(xml).toContain("root");
      expect(xml).toContain("test");
    });
  });

  describe("round-trip conversion", () => {
    it("should convert XML to JSON and back to XML", async () => {
      const originalXml = `<?xml version="1.0" encoding="utf-8"?>
        <root>
          <name>John</name>
          <age>30</age>
        </root>`;

      const json = await Parser.xmlToJson<any>(originalXml);
      const newXml = Parser.jsonToXml(json);

      // Parse both to compare structure (format might differ)
      const originalParsed = await Parser.xmlToJson<any>(originalXml);
      const newParsed = await Parser.xmlToJson<any>(newXml);

      expect(newParsed.root.name).toBe(originalParsed.root.name);
      expect(newParsed.root.age).toBe(originalParsed.root.age);
    });
  });
});
