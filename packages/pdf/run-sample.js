#!/usr/bin/env node

const path = require("path");
const Module = require("module");
const fs = require("fs");

// Setup alias resolver
const originalResolveFilename = Module.prototype._resolveFilename;
Module.prototype._resolveFilename = function (request, parent) {
  if (request.startsWith("@src/")) {
    const newRequest = path.join(
      __dirname,
      "src",
      request.replace("@src/", ""),
    );
    return originalResolveFilename.call(this, newRequest, parent);
  }
  return originalResolveFilename.call(this, request, parent);
};

// Require the TypeScript file through ts-node
require("ts-node").register({
  project: path.join(__dirname, "tsconfig.json"),
  transpileOnly: true,
});

require("./scripts/generate-sample.ts");
