import * as connect from './connect';
import * as $ from 'jquery';
import {ipcRenderer} from 'electron';

$(function() {
    $('#send').click(function() {
        sendMsj();
    });

    $('#msj').keypress(function(ev) {
        var msj = $(this).val().trim();
        if (ev.which == 13 && msj.length > 0)
            sendMsj();
    });
});

function sendMsj() {
    var msj = $('#msj').val().trim();
    if (msj.length > 0) {
        $('#chat').append(`<li><b>user: </b>${msj}</li>`);
        $('#msj').val('');
    }
}
