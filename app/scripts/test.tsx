import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {UserList} from './components';

var data = [
    { key: 1, name: "Pete Hunt" },
    { key: 2, name: "Jordan Walke" }
];

ReactDOM.render(
    <UserList data={data}/>,
    document.getElementById('test')
);
