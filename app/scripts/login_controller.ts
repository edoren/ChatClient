import {ipcRenderer} from 'electron';  // Module to control application life.

var btn = document.getElementById('register');

btn.addEventListener('click', function() {
    ipcRenderer.send('user-register');;
});
