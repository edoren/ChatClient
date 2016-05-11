import * as net from "net";
import * as events from "events";
import {Message} from "./Message"


export class SocketManager extends events.EventEmitter {
    address: { host: string; port: number };
    socket: net.Socket;

    constructor() {
        super();
        this.socket = new net.Socket();
        // this.address = { host: "localhost", port: 9999 };

        this.socket.on("data", (data: Buffer) => {
            var msg = Message.Decode(data);
            this.emit("receive", msg);
        });

        this.socket.on("close", (had_error: boolean) => {
            this.emit("close", had_error);
        });

        this.socket.on("error", (err: Error) => {
            this.emit("error", err);
        });

        this.socket.on("timeout", () => {
            this.emit("timeout");
        });
    }

    Connect(host: string, port: number, connectionListener?: Function) {
        this.address = { host: host, port: port };
        this.socket.connect(port, host, connectionListener);
    }

    Send(msg: Message) {
        var data = Message.Encode(msg);
        this.socket.write(data);
    }
}
