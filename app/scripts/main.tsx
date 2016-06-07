import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as connect from "./connect";
import {UserList, RoomList} from './components';

var users_data = [
    { key: "abc", name: "Pete Hunt" },
    { key: "123", name: "Jordan Walke" },
    { key: "cba", name: "Sebas Duque" },
    { key: "321", name: "Manuel Sabogal" },
    { key: "1ab", name: "Caro Gomez" }
];

var rooms_data = [
    { key: 1, name: "Room A" },
    { key: 2, name: "Room B" },
    { key: 3, name: "Room C" }
];

ReactDOM.render(
    <RoomList data={rooms_data}/>,
    document.getElementById('rooms')
);

ReactDOM.render(
    <UserList data={users_data}/>,
    document.getElementById('users')
);

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
