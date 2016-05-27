import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as connect from "./connect";
import {UserList, RoomList, MyInput} from './components';

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

/* ReactDOM.render(
    <MyInput text="Hola Mundo"/>,
    document.getElementById('test-input')
);*/

enum MessageType {
    CHAT = 0,
    LOGIN = 1,
    REGISTER = 2,
    CREATE_ROOM = 3,
    REMOVE_ROOM = 4,

    RESPONSE = 100,

    SERVER_CLOSE = 200
}

enum ResponseCode {
    OK = 0,
    INVALID_MESSAGE = 1,
    INVALID_USERNAME = 2,
    INVALID_LOGIN_INFO = 3,
    USER_ALREADY_REGISTERED = 4,
    ROOM_ALREADY_CREATED = 5,
    NON_EXISTING_USER = 6,
    NON_EXISTING_ROOM = 7,
    NOT_ROOM_OWNER = 8
}

var socket = new connect.SocketManager();
socket.on("receive", function(msg) {
    console.log(msg);
    if (msg.type == MessageType.RESPONSE) {
        console.log("Respuesta para:", MessageType[msg.content.msg_id])
        console.log("Codigo de respuesta:", ResponseCode[msg.content.code])
    }
})

var data = {
    "name": "pepe",
    "last_name": "grillo",
    "user": "pepillo",
    "password": "asdf1234",
    "age": 40,
    "gender": "m"
}

socket.Connect("localhost", 9999);

var msg = new connect.Message(MessageType.REGISTER, data);
socket.Send(msg);
