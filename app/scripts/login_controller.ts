import * as connect from './connect';
import * as $ from 'jquery';
import * as fs from 'fs';
import {SocketConnection} from './socket_connection';
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

        var socket = SocketConnection.getInstance();

        socket.on("receive", function(msg) {
            console.log(msg);
            //alert(JSON.stringify(msg));
            if (msg.type == connect.MessageType.RESPONSE) {
                if (msg.content.code == connect.ResponseCode.INVALID_LOGIN_INFO) {
                    ipcRenderer.send('loadWindow', 2);
                    alert("Los datos ingresados no son correctos!");
                }
                else {
                    var user = data.user;
                    var rooms = [
                        { key: 1, name: "Room A" },
                        { key: 2, name: "Room B" },
                        { key: 3, name: "Room C" }
                    ];

                    ipcRenderer.send('loadWindow', 3);
                    ipcRenderer.send('updateFile', {"data": rooms, "type": "rooms"});
                    ipcRenderer.send('updateFile', {"data": user, "type": "user"});
                }

                console.log("Respuesta para:", connect.MessageType[msg.content.msg_id]);
                console.log("Codigo de respuesta:", connect.ResponseCode[msg.content.code]);
            }
        });

        var msg = new connect.Message(connect.MessageType.LOGIN, data);
        socket.Send(msg);

    });
});
