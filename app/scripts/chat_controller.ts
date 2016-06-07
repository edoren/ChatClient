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

        // var data = {
        //     "user": "",
        //     "room": "default",
        //     "message": msj
        // };
        //
        // var socket = new connect.SocketManager();
        // socket.Connect("190.128.55.241", 9999);
        // //socket.Connect("localhost", 9999);
        //
        // var msg = new connect.Message(connect.MessageType.CHAT, data);
        // socket.Send(msg);
        //
        // socket.on("receive", function(msg) {
        //     console.log(msg);
        //     if (msg.type == connect.MessageType.RESPONSE) {
        //         console.log("Respuesta para:", connect.MessageType[msg.content.msg_id]);
        //         console.log("Codigo de respuesta:", connect.ResponseCode[msg.content.code]);
        //     }
        // });
    }
}
