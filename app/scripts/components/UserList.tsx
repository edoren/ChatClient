import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface UserProps {
    key: string;
    name: string;
}

interface UserState {
    key?: string;
    name?: string;
}

class User extends React.Component <UserProps, UserState> {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.key,
            name: this.props.name
        };
    }

    componentDidMount() {
        this.setState({
            key: this.props.key,
            name: this.props.name
        });
    }

    render() {
        return (
            <a href="#">{this.state.name}  </a>
        );
    }
}

interface UserListProps {
    data: Array<UserProps>;
}

interface UserListState {
    data?: Array<UserProps>;
}

export class UserList extends React.Component <UserListProps, UserListState> {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.setState({
            data: this.props.data
        });
    }

    removeUser(index: number) {
        var data = this.state.data;
        data.splice(index, 1);

        this.setState({
            data: data
        });
    }

    addUser() {
        var data = this.state.data;
        data.push({
            key: this.makeId(4),
            name: this.makeId(6)
        });

        this.setState({
            data: data
        });
    }

    makeId(n) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < n; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    render() {
        var users = this.state.data.map((user, index) => {
            return (
                <li>
                    <User key={user.key} name={user.name}/>
                    <label id={user.key} onClick={this.removeUser.bind(this, index)}>X</label>
                </li>
            );
        });

        return (
            <div>
                <ul>{users}</ul>
                <button onClick={this.addUser.bind(this)}>ADD</button>
            </div>
        );
    }
}
