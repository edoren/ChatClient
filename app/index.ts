import * as electron from 'electron';  // Module to control application life.
import * as fs from 'fs';
import * as rimraf from 'rimraf';

// Quit when all windows are closed.
electron.app.on('window-all-closed', () => {
    if (process.platform != "darwin") {
        electron.app.quit();
    }
});

electron.app.on("ready", () => {
    // Create the browser window.
    var mainWindow = new electron.BrowserWindow({
        "width": 920,
        "height": 550,
        "minWidth": 920,
        "minHeight": 550
    });

    var registerWindow = new electron.BrowserWindow({
        "width": 920,
        "height": 550,
        "minWidth": 920,
        "minHeight": 550,
        "show": false
    });

    mainWindow.loadURL('file://' + __dirname + '/views/chat.html');
    registerWindow.loadURL('file://' + __dirname + '/views/register.html');
    mainWindow.on('closed', () => {
        rimraf(__dirname + '/../tmp2', (err) => {
            if (err) console.error(err);
        });
        // fs.stat(__dirname + '/../tmp/data.json', (err, stat) => {
        //     if (err) console.error(err);
        //     fs.unlinkSync(__dirname + '/../tmp/data.json');
        // });
    });

    electron.ipcMain.on('loadWindow', (event, arg) => {
        switch (arg) {
            case 1:
                mainWindow.hide();
                registerWindow.show();
                break;
            case 2:
                registerWindow.hide();
                mainWindow.show();
                break;
            case 3:
                mainWindow.loadURL('file://' + __dirname + '/views/chat.html');
                break;
            default:
                registerWindow.hide();
                mainWindow.show();
        }
    });

    electron.ipcMain.on('updateFile', (event, arg) => {
        switch (arg.type) {
            case "rooms":
                fs.writeFile(__dirname + '/../tmp/rooms.json', JSON.stringify({"rooms": arg.data}, null, 4));
                break;
            case "users":
                fs.writeFile(__dirname + '/../tmp/users.json', JSON.stringify({"users": arg.data}, null, 4));
                break;
        }
    });
});
