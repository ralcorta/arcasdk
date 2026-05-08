/**
 * Build any workspace package and copy npm pack output to a stable .tgz path
 * (same files a consumer gets from npm install @scope/pkg@version).
 *
 * Usage:
 *   node packages/core/tests/integration/scripts/pack-package-for-consumer.js <packageDir> [--out <stable.tgz>]
 *
 * <packageDir>  Path under repo root (e.g. packages/core, packages/mi-paquete).
 * --out          Destination .tgz (absolute or relative to repo root).
 *                Default: packages/core/tests/integration/consumer-app/vendor/<último-segmento-del-nombre>.tgz
 *                (p.ej. @arcasdk/core → packages/core/tests/integration/consumer-app/vendor/core.tgz)
 *
 * Examples:
 *   node integration/scripts/pack-package-for-consumer.js packages/core
 *   node integration/scripts/pack-package-for-consumer.js packages/core --out packages/core/tests/integration/consumer-app/vendor/core.tgz
 *   node integration/scripts/pack-package-for-consumer.js packages/otro --out packages/otro/tests/integration/consumer-app/vendor/otro.tgz
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../../../../..");

function runNpm(args, cwd) {
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const r = spawnSync(npmCmd, args, {
    cwd,
    stdio: "inherit",
    shell: false,
  });
  if (r.error) throw r.error;
  if (r.status !== 0) {
    throw new Error(
      `npm ${args.join(" ")} exited with code ${String(r.status)}`,
    );
  }
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const outIdx = args.indexOf("--out");
  let outArg = null;
  if (outIdx !== -1) {
    outArg = args[outIdx + 1];
    args.splice(outIdx, 2);
  }
  const packageDir = args[0] || "packages/core";
  return { packageDir, outArg };
}

function npmPackBasename(pkgJson) {
  const { name, version } = pkgJson;
  if (!name || !version) {
    throw new Error("package.json must have name and version");
  }
  const safe = name.replace(/^@/, "").replace(/\//g, "-");
  return `${safe}-${version}.tgz`;
}

function defaultStableTgzPath(repoRootArg, pkgJson) {
  const name = pkgJson.name;
  const shortName = name.includes("/")
    ? name.split("/").pop()
    : name.replace(/^@/, "");
  if (!shortName) {
    throw new Error(
      `Cannot derive artifact short name from package name: ${name}`,
    );
  }
  return path.join(
    repoRootArg,
    "packages",
    "core",
    "tests",
    "integration",
    "consumer-app",
    "vendor",
    `${shortName}.tgz`,
  );
}

const { packageDir: packageDirRel, outArg } = parseArgs(process.argv);
const packageDir = path.isAbsolute(packageDirRel)
  ? packageDirRel
  : path.join(repoRoot, packageDirRel);

if (!fs.existsSync(path.join(packageDir, "package.json"))) {
  throw new Error(`No package.json in ${packageDir}`);
}

const pkgJson = JSON.parse(
  fs.readFileSync(path.join(packageDir, "package.json"), "utf8"),
);
const expectedPacked = npmPackBasename(pkgJson);

const stableTgz = outArg
  ? path.isAbsolute(outArg)
    ? outArg
    : path.join(repoRoot, outArg)
  : defaultStableTgzPath(repoRoot, pkgJson);

const vendorDir = path.dirname(stableTgz);
fs.mkdirSync(vendorDir, { recursive: true });

runNpm(["run", "build"], packageDir);
runNpm(["pack", "--pack-destination", vendorDir], packageDir);

const producedPath = path.join(vendorDir, expectedPacked);
if (!fs.existsSync(producedPath)) {
  const anyTgz = fs
    .readdirSync(vendorDir)
    .filter((f) => f.endsWith(".tgz") && f !== path.basename(stableTgz));
  throw new Error(
    `Expected ${expectedPacked} after npm pack. Found in vendor: ${anyTgz.join(", ") || "(none)"}`,
  );
}

fs.copyFileSync(producedPath, stableTgz);
console.info(`Wrote ${stableTgz} (from ${expectedPacked})`);
