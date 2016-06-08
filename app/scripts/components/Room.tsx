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

export class Room extends React.Component <RoomProps, RoomState> {
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

    exitRoom(ev) {
        ipcRenderer.send('loadWindow', 3);
        alert("BYE!!");
    }

    render() {
        return (
            <div>
                <div className>
                    <Icon>account_balance</Icon>
                    <label>{this.state.name}</label>
                </div>
                <div className="row center" id="exit">
                    <Button onClick={this.exitRoom.bind(this)} className="waves-effect waves-light">EXIT ROOM</Button>
                </div>
            </div>
        );
    }
}
