import * as React from 'react';
import * as ReactDOM from 'react-dom';

var data = [
    { key: 1, name: "Pete Hunt" },
    { key: 2, name: "Jordan Walke" }
];

interface UserProps {
    key: number;
    name: string;
}

class User extends React.Component<UserProps, {}> {
    render() {
        return (
            <li className="user">
                <a href="#">
                    {this.props.name}
                    <span class="block-list-label">1</span>
                </a>
            </li>
        );
    }
}

interface UserListProps {
    data: Array<UserProps>;
}

export class UserList extends React.Component<UserListProps, {}> {
    render() {
        var user_nodes = this.props.data.map(function(user) {
            return (
                <User name={user.name} key={user.key} />
            );
        });

        return (
            <ul className="user_list">
                {user_nodes}
            </ul>
        );
    }
}
