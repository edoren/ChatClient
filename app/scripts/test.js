"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var components_1 = require('./components');
var data = [
    { key: 1, name: "Pete Hunt" },
    { key: 2, name: "Jordan Walke" }
];
ReactDOM.render(React.createElement(components_1.UserList, {data: data}), document.getElementById('test'));
