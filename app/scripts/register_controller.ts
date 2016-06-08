import * as $ from 'jquery';
import * as connect from './connect';
import {SocketConnection} from './socket_connection';
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

        var socket = SocketConnection.getInstance();
        socket.on("receive", function(msg) {
            console.log(msg);
            if (msg.type == connect.MessageType.RESPONSE) {
                if (msg.content.code == connect.ResponseCode.INVALID_USERNAME) {
                    ipcRenderer.send('loadWindow', 1);
                    alert("El user no tiene un valor valido!");
                }
                else if (msg.content.code == connect.ResponseCode.USER_ALREADY_REGISTERED) {
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

        var msg = new connect.Message(connect.MessageType.REGISTER, data);
        socket.Send(msg);

    });
});
