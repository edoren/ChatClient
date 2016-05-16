"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var data = [
    { key: 1, name: "Pete Hunt" },
    { key: 2, name: "Jordan Walke" }
];
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    User.prototype.render = function () {
        return (React.createElement("li", {className: "user"}, 
            React.createElement("a", {href: "#"}, 
                this.props.name, 
                React.createElement("span", {class: "block-list-label"}, "1"))
        ));
    };
    return User;
}(React.Component));
var UserList = (function (_super) {
    __extends(UserList, _super);
    function UserList() {
        _super.apply(this, arguments);
    }
    UserList.prototype.render = function () {
        var user_nodes = this.props.data.map(function (user) {
            return (React.createElement(User, {name: user.name, key: user.key}));
        });
        return (React.createElement("ul", {className: "user_list"}, user_nodes));
    };
    return UserList;
}(React.Component));
exports.UserList = UserList;
