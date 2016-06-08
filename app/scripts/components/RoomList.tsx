import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Button, Icon} from 'react-materialize';
import {ipcRenderer} from 'electron';

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

    componentDidMount() {
        this.setState({
            key: this.props.key,
            name: this.props.name
        });
    }

    openRoom(ev) {
        var data = {
            "key": this.state.key,
            "name": this.state.name
        };

        ipcRenderer.send('updateFile', {"data": data, "type": "room"});
        ipcRenderer.send('loadWindow', 4);
    }

    render() {
        return (
            <a href="#" onClick={this.openRoom.bind(this)}>{this.state.name}</a>
        );
    }
}

interface RoomListProps {
    data: Array<RoomProps>;
}

interface RoomListState {
    data?: Array<RoomProps>;
    tmp?: string;
}

export class RoomList extends React.Component <RoomListProps, RoomListState> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tmp: ""
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

    addRoom(ev) {
        var data = this.state.data;
        var name = this.state.tmp;
        var id = Math.floor(Math.random() * 100);
        name = (name == "")? "Room " + (id).toString() : name;
        var ok = true;

        data.forEach(function(room) {
            if (room.name == name) {
                alert(`Ya existe una sala con el nombre "${name}", por favor elige otro nombre`);
                ok = false;
                return;
            }
        });

        if (ok) {
            data.push({
                key: id,
                name: name
            });

            this.setState({
                data: data,
                tmp: ""
            });

            ipcRenderer.send('updateFile', {"data": data, "type": "rooms"});
        }
    }

    editName(ev) {
        this.setState({
            tmp: ev.target.value
        });
    }

    render() {
        var rooms = this.state.data.map((room, index) => {
            return (
                <li>
                    <Icon>home</Icon>
                    <label><Room key={room.key} name={room.name}/></label>
                    <label className="exit" onClick={this.removeRoom.bind(this, index)}>  X</label>
                </li>
            );
        });

        return (
            <div>
                <div className>
                    <ul>{rooms}</ul>
                    <input type="text" placeholder="Room Name" value={this.state.tmp} onChange={this.editName.bind(this)}/>
                </div>
                <div className="row center">
                    <Button onClick={this.addRoom.bind(this)} className="waves-effect waves-light">ADD</Button>
                </div>
            </div>
        );
    }
}
