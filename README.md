# Romm PWA Instructions

> The brave-debloat policy is falcultative but encouraged.

Since the romm-deck app doesn't work for now, this how I got the Romm to work on the Steam Deck.

1. Open a shell and set sudo password by typing `passwd`, if not already done.
2. Install Brave browser from Discover in desktop mode.
3. Create the policy folder structure and the policy file :
```
sudo mkdir /etc/brave
sudo mkdir /etc/brave/policies
sudo mkdir /etc/brave/policies/managed
sudo nano /etc/brave/policies/managed/brave.json
```
3. Paste the [brave-debloat](https://github.com/gongchandang49/brave-debloat) policy content [`brave.json`](https://github.com/gongchandang49/brave-debloat/blob/main/generated/linux/brave.json) and remove the extentions :
```json
  "ExtensionInstallForcelist": [
    "cjpalhdlnbpafiamejdnhcphjbkeiagm",
    "eimadpbcbfnmbkopoojfekhnkhdbieeh",
    "mpbjkejclgfgadiemmefgebjfooflfhl"
  ]
```
4. Save the file with `CTRL + X` + `Y` and start Brave browser.
5. Go to `brave://policy` and click "Reload policies".
6. Access your Romm instance url, deactivate Brave Shields and quit Brave.
7. Add a non Steam game and choose any app, just so you can add one.
8. Right click the app and *Properties*, then *Shortcut*. and edit the fields.
9. In target write `"/usr/bin/flatpack"`.
10. In startup write `/usr/bin/`
11. In startup options write the following and replacer `<domain/ip:port>` according to your instance :
```
run --branch=stable --arch=x86_64 --filesystem=/run/udev:ro --command=brave com.brave.Browser --window-size=1024,640 --force-device-scale-factor=1.25 --app="https://<domain/ip:port>/console." --start-fullscreen
```

***

# VPN Instructions

Access your Romm instance outside of your home anywhere in the world. This part assumes that you've already setup a local VPN server in your home network.

1. Open a shell and install Decky Loader :
```shell
sudo curl -L https://github.com/SteamDeckHomebrew/decky-installer/releases/latest/download/install_release.sh | sh
```
2. Open system settings and navigate to `Wi-Fi & Networking`.

> Important : Your VPN file **must** be renamed to the interface name, for example `wg0.conf`.
  
3. Click the `+` icon and then select `Import VPN connection...` and select your VPN configuration file.
4. Reboot in gaming mode and open the quick access menu by clicking the `...` on your Steam Deck and select [TunnelDeck](https://github.com/bkohler616/TunnelDeck) from the Decky Plugins panel.

Here you'll be able to see all of the connections you have in Network Manager and simply click on the toggle to connect or disconnect from the VPN.
  
***

# Build Instructions

> Note: This section is for developers only.

Run this command to create the AppImage:
```
npm run dist:linux
```

Tranfer to your Steam Deck. You can connect with SSH :

1. Activate Developer mode on your Steam Deck
2. Reboot in desktop mode
3. Open a terminal and type `pswd` to create a password
4. Connect by SSH to your deck with `deck` user and password you just set

> ssh deck:pass@steamdeckip

You can now do SFTP transfers directly in your `$HOME` folder.

Transfer the `.AppImage` and the `steam_appid.txt` files to your deck somwhere like `~/romm-deck`.

Open a terminal and go to that folder and `chmod +x` the `.AppImage` executable.

Add as non steam game. You can simply right click the app in desktop mode.

Add the `--no-sandbox` flag to the app in Steam paramaters.

# steamworks.js not implemented -- help required

Currently you'll have to map the keyboard controls to the Steam Deck input before launching the app.

I'm not releasing this to the public before we can make this work natively with Steam Input.

Should be doable with `steamworks.js` and the Steam API :

https://github.com/ceifa/steamworks.js  
https://liana.one/integrate-electron-steam-api-steamworks

I'm stuck here and I need help to get this working.

Any help is appreciated.
