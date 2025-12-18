(async () => {
  const input = document.getElementById("url");
  const save = document.getElementById("save");
  const err = document.getElementById("err");

  const cfg = await window.rommDeck.getConfig();
  if (cfg.rommBaseUrl) input.value = cfg.rommBaseUrl;

  async function onSave() {
    err.textContent = "";
    const res = await window.rommDeck.setConfig(input.value);
    if (!res.ok) {
      err.textContent = res.error || "Erreur";
      return;
    }
    await window.rommDeck.reloadToRomm();
  }

  save.addEventListener("click", onSave);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") onSave();
  });
})();
