import * as connect from './connect';
import * as $ from 'jquery';
import {ipcRenderer} from 'electron';  // Module to control application life.

$(function() {
    $('#register').click(function() {
        ipcRenderer.send('loadWindow', 1);
    });

    $('#login').submit(function() {
        var data = {
            "user": $('#user').val(),
            "password": $('#password').val()
        };

        //alert(JSON.stringify(data));
        var socket = new connect.SocketManager();
        socket.Connect("190.128.55.241", 9999);
        //socket.Connect("localhost", 9999);

        var msg = new connect.Message(connect.MessageType.LOGIN, data);
        socket.Send(msg);

        socket.on("receive", function(msg) {
            console.log(msg);
            if (msg.type == connect.MessageType.RESPONSE) {
                if (connect.MessageType[msg.content.msg_id] == "3") {
                    ipcRenderer.send('loadWindow', 2);
                    alert("Los datos ingresados no son correctos!");
                }
                else {
                    ipcRenderer.send('loadWindow', 3);
                }

                console.log("Respuesta para:", connect.MessageType[msg.content.msg_id]);
                console.log("Codigo de respuesta:", connect.ResponseCode[msg.content.code]);
            }
        });
    });
});
