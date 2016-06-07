import * as $ from 'jquery';
import * as connect from './connect';
import {ipcRenderer} from 'electron';

$(function() {
    $('#back').click(function() {
        ipcRenderer.send('loadWindow', 2);
    });

    $('#register').submit(function() {
        var gender = $('input[name=gender]:checked', '#gender').val();
        var data = {
            "name": $('#name').val().toLowerCase(),
            "last_name": $('#last_name').val().toLowerCase(),
            "user": $('#username').val().toLowerCase(),
            "password": $('#password').val().toLowerCase(),
            "age": Number($('#age').val()),
            "gender": gender
        };

        var socket = new connect.SocketManager();
        socket.on("receive", function(msg) {
            console.log(msg);
            if (msg.type == connect.MessageType.RESPONSE) {
                if (connect.MessageType[msg.content.msg_id] == "2") {
                    ipcRenderer.send('loadWindow', 1);
                    alert("El user no tiene un valor valido!");
                }
                else if (connect.MessageType[msg.content.msg_id] == "4") {
                    ipcRenderer.send('loadWindow', 1);
                    alert("El usuario ya se encuentra registrado!");
                }
                else {
                    ipcRenderer.send('loadWindow', 2);
                }

                console.log("Respuesta para:", connect.MessageType[msg.content.msg_id]);
                console.log("Codigo de respuesta:", connect.ResponseCode[msg.content.code]);
            }
        });

        socket.Connect("190.128.55.241", 9999);
        //socket.Connect("localhost", 9999);

        var msg = new connect.Message(connect.MessageType.REGISTER, data);
        socket.Send(msg);
    });
});
