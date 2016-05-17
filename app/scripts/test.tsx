import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {UserList, RoomList, MyInput} from './components';

var users_data = [
    { key: "abc", name: "Pete Hunt" },
    { key: "123", name: "Jordan Walke" }
];

var rooms_data = [
    { key: 1, name: "Room A" },
    { key: 2, name: "Room B" },
    { key: 3, name: "Room C" }
];

ReactDOM.render(
    <UserList data={users_data}/>,
    document.getElementById('test-users')
);

ReactDOM.render(
    <MyInput text="Hola Mundo"/>,
    document.getElementById('test-input')
);

ReactDOM.render(
    <RoomList data={rooms_data}/>,
    document.getElementById('test-rooms')
);
