const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("rommDeck", {
  getConfig: () => ipcRenderer.invoke("config:get"),
  setConfig: (rommBaseUrl) => ipcRenderer.invoke("config:set", { rommBaseUrl }),
  reloadToRomm: () => ipcRenderer.invoke("app:reloadToRomm")
});
