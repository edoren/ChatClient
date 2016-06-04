var electron = require("electron");  // Module to control application life.
var BrowserWindow = require("browser-window");  // Module to create native browser window.
var ipc = require("ipc");

// Quit when all windows are closed.
electron.app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != "darwin") {
        electron.app.quit();
    }
});

electron.app.on("ready", function() {
    // Create the browser window.
    loginWindow = new BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450
    });
    loginWindow.loadURL('file://' + __dirname + '/index.html');

    registerWindow = new BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450,
        "show": false
    });
    registerWindow.loadURL('file://' + __dirname + '/register.html');

    chatWindow = new BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450,
        "show": false
    });
    chatWindow.loadURL('file://' + __dirname + '/chat.html');

    roomWindow = new BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450,
        "show": false
    });
    roomWindow.loadURL('file://' + __dirname + '/chat.html');

    ipc.on('register', function() {
        registerWindow.show();
        loginWindow.hide();
    });
});
