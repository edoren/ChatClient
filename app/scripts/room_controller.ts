import * as connect from './connect';
import * as $ from 'jquery';
import {ipcRenderer} from 'electron';
import {SocketConnection} from './socket_connection';

$(function() {
    var user = "";
    $.getJSON('../../tmp/data.json', function(data) {
        user = data.user;
    });

    $('#send').click(function() {
        sendMsj(user);
    });

    $('#msj').keypress(function(ev) {
        var msj = $(this).val().trim();
        if (ev.which == 13 && msj.length > 0)
            sendMsj(user);
    });
});

function sendMsj(user) {
    var msj = $('#msj').val().trim();
    if (msj.length > 0) {
        $('#chat').append(`<li><b>${user}: </b>${msj}</li>`);
        $('#msj').val('');

        var data = {
            "user": user,
            "room": "default",
            "message": msj
        };

        var socket = SocketConnection.getInstance();
        socket.on("receive", function(msg) {
            console.log(msg);
            if (msg.type == connect.MessageType.RESPONSE) {
                console.log("Respuesta para:", connect.MessageType[msg.content.msg_id]);
                console.log("Codigo de respuesta:", connect.ResponseCode[msg.content.code]);
            }
        });

        var msg = new connect.Message(connect.MessageType.CHAT, data);
        socket.Send(msg);
    }
}
