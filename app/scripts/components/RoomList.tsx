import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface RoomProps {
    key: number;
    name: string;
}

interface RoomState {
    key?: number;
    name?: string;
}

class Room extends React.Component <RoomProps, RoomState> {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.key,
            name: this.props.name
        };
    }

    componentWillMount() {
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

interface RoomListProps {
    data: Array<RoomProps>;
}

interface RoomListState {
    data?: Array<RoomProps>;
}

export class RoomList extends React.Component <RoomListProps, RoomListState> {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        });
    }

    removeRoom(index: number) {
        var data = this.state.data;
        data.splice(index, 1);

        this.setState({
            data: data
        });
    }

    addRoom() {
        var data = this.state.data;
        data.push({
            key: Math.floor(Math.random() * 100),
            name: "Room " + this.makeId(3)
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
        var rooms = this.state.data.map((room, index) => {
            return (
                <li>
                    <Room key={room.key} name={room.name}/>
                    <label id={room.key} onClick={this.removeRoom.bind(this, index)}>X</label>
                </li>
            );
        });

        return (
            <div>
                <ul>{rooms}</ul>
                <button onClick={this.addRoom.bind(this)}>ADD</button>
            </div>
        );
    }
}
