const path = require("path");
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const Store = require("electron-store").default;

const store = new Store({ name: "config" });
const steamMod = require("./steam");

process.env.ELECTRON_ENABLE_LOGGING = "1";
process.env.ELECTRON_ENABLE_STACK_DUMPING = "1";
process.env.ELECTRON_LOG_FILE = "romm-deck.log";

app.whenReady().then(async () => {
  try {
    steamMod.initSteam();
    steamMod.initSteamInput();
  } catch (e) {
    console.warn("Steam init failed:", e);
  }

  await createWindow();
});

function normalizeRommBaseUrl(input) {
  let s = (input || "").trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = `http://${s}`;

  try {
    const u = new URL(s);
    u.pathname = u.pathname.replace(/\/+$/, "");
    return u.toString();
  } catch {
    return null;
  }
}

function rommConsoleUrl(input) {
  let s = (input || "").trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = `http://${s}`;

  try {
    const u = new URL(s);
    u.pathname = "/console";
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return null;
  }
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 640,
    fullscreen: true,
    kiosk: false,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: "#0b0f14",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("did-finish-load", () => {
    win.webContents.setZoomFactor(1.25);
  });

  const base = store.get("rommBaseUrl");
  const url = rommConsoleUrl(base);

  if (!url) {
    await win.loadFile(path.join(__dirname, "setup.html"));
    return;
  }

  await win.loadURL(url);
}

ipcMain.handle("config:get", () => {
  return { rommBaseUrl: store.get("rommBaseUrl") || "" };
});

ipcMain.handle("config:set", (_evt, { rommBaseUrl }) => {
  const normalized = normalizeRommBaseUrl(rommBaseUrl);
  if (!normalized) return { ok: false, error: "URL invalide (ex: https://monromm.tld ou 192.168.1.10:8080)" };
  store.set("rommBaseUrl", normalized);
  return { ok: true, rommBaseUrl: normalized };
});

ipcMain.handle("app:reloadToRomm", async () => {
  const win = BrowserWindow.getAllWindows()[0];
  const base = store.get("rommBaseUrl");
  const url = rommConsoleUrl(base);
  if (win && url) await win.loadURL(url);
  return { ok: true };
});

app.on("window-all-closed", () => app.quit());
