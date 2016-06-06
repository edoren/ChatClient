import * as electron from 'electron';  // Module to control application life.

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
    var loginWindow = new electron.BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450
    });
    loginWindow.loadURL('file://' + __dirname + '/views/login.html');

    var registerWindow = new electron.BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450,
        "show": false
    });
    registerWindow.loadURL('file://' + __dirname + '/views/register.html');

    var chatWindow = new electron.BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450,
        "show": false
    });
    chatWindow.loadURL('file://' + __dirname + '/views/chat.html');

    var roomWindow = new electron.BrowserWindow({
        "width": 600,
        "height": 450,
        "minWidth": 600,
        "minHeight": 450,
        "show": false
    });

    roomWindow.loadURL('file://' + __dirname + '/views/chat.html');

    electron.ipcMain.on('user-register', function(event, arg) {
        loginWindow.loadURL('file://' + __dirname + '/views/register.html');
        // registerWindow.show();
        // loginWindow.hide();
    });
});
