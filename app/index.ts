import * as electron from 'electron';  // Module to control application life.

// Quit when all windows are closed.
electron.app.on('window-all-closed', () => {
    if (process.platform != "darwin") {
        electron.app.quit();
    }
});

electron.app.on("ready", () => {
    // Create the browser window.
    var mainWindow = new electron.BrowserWindow({
        "width": 640,
        "height": 480,
        "minWidth": 640,
        "minHeight": 480
    });

    var registerWindow = new electron.BrowserWindow({
        "width": 640,
        "height": 480,
        "minWidth": 640,
        "minHeight": 480,
        "show": false
    });

    mainWindow.loadURL('file://' + __dirname + '/views/login.html');
    registerWindow.loadURL('file://' + __dirname + '/views/register.html');

    electron.ipcMain.on('loadWindow', (event, arg) => {
        switch(arg) {
            case 1:
                mainWindow.hide();
                registerWindow.show();
                break;
            case 2:
                registerWindow.hide();
                mainWindow.show();
                break;
            case 3:
                registerWindow.hide();
                mainWindow.loadURL('file://' + __dirname + '/views/chat.html');
                mainWindow.show();
                break;
            default:
                registerWindow.hide();
                mainWindow.show();
        }
    });
});
