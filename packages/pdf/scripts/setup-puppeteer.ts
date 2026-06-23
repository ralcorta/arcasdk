import { existsSync } from "fs";

if (!process.env.PUPPETEER_EXECUTABLE_PATH) {
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];

  for (const path of candidates) {
    if (existsSync(path)) {
      process.env.PUPPETEER_EXECUTABLE_PATH = path;
      break;
    }
  }
}
