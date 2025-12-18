# Build instructions

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
