let steam = null;

function initSteam() {
  if (steam) return steam;
  const steamworks = require("steamworks.js").init();

  if (steamworks?.electronEnableSteamOverlay) {
    steamworks.electronEnableSteamOverlay();
  }

  steam = steamworks;
  return steam;
}
