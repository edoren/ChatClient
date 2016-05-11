import * as connect from "./connect";

enum MsgType {
    CHAT = 0
}

var socket = new connect.SocketManager();
socket.Connect("localhost", 9999);

var msg = new connect.Message(MsgType.CHAT, "HOLA");

socket.Send(msg);

socket.on("receive", function(msg) {
    console.log(msg);
})
