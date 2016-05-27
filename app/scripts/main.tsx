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




enum MsgType {
    CHAT = 0
}

var socket = new connect.SocketManager();
socket.Connect("localhost", 9999);

var msg = new connect.Message(MsgType.CHAT, "HOLA");

socket.Send(msg);

socket.on("receive", function(msg) {
    console.log(msg);
})
