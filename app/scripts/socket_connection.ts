import {SocketManager} from "./connect";

export class SocketConnection {
    private static instance: SocketManager;

    static getInstance() {
        if (SocketConnection.instance === undefined) {
            SocketConnection.instance = new SocketManager();
            SocketConnection.instance.Connect("190.128.55.241", 9999);
        }
        return SocketConnection.instance
    }
}
