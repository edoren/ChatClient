import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as connect from "./connect";
import {UserList, RoomList, Room} from './components';
import * as $ from 'jquery';

var users_data = [];
var rooms_data = [];

$(function() {
    $.getJSON('../../tmp/rooms.json', (data) => {
        rooms_data = data.rooms;
        ReactDOM.render(
            <RoomList data={rooms_data}/>,
            document.getElementById('rooms')
        );
        // ReactDOM.render(
        //     <Room data={rooms_data}/>,
        //     document.getElementById('room')
        // );
    });

    $.getJSON('../../tmp/users.json', (data) => {
        users_data = data.users;
        ReactDOM.render(
            <UserList data={users_data}/>,
            document.getElementById('users')
        );
    });
});

/*var socket = new connect.SocketManager();
socket.on("receive", function(msg) {
    console.log(msg);
    if (msg.type == connect.MessageType.RESPONSE) {
        console.log("Respuesta para:", connect.MessageType[msg.content.msg_id]);
        console.log("Codigo de respuesta:", connect.ResponseCode[msg.content.code]);
    }
});

var data = {
    "name": "pepe",
    "last_name": "grillo",
    "user": "pepillo",
    "password": "asdf1234",
    "age": 40,
    "gender": "m"
}

socket.Connect("localhost", 9999);

var msg = new connect.Message(connect.MessageType.REGISTER, data);
socket.Send(msg);*/
