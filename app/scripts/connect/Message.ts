import * as bson from 'bson';

var BSON = new bson.BSONPure.BSON();


export class Message {
    type: any;
    content: any;

    constructor(type: any, content: any) {
        this.type = type;
        this.content = content;
    }

    static Encode(msg: Message) {
        var data = BSON.serialize(msg, false, true, false);
        return data;
    }

    static Decode(data: Buffer): Message {
        var obj = BSON.deserialize(data);
        if ("type" in obj && "content" in obj) {
            return new Message(obj.type, obj.content);
        }
    }
}
