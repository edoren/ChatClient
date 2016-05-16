var electron = require("electron");  // Module to control application life.
var BrowserWindow = require("browser-window");  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
electron.app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != "darwin") {
        electron.app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
electron.app.on("ready", function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450
    });

    // and load the index.html of the app.
    mainWindow.loadURL("file://" + __dirname + "/register.html");

    // Open the DevTools.
    //mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
