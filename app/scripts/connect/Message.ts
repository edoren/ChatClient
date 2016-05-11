import * as bson from 'bson';

var BSON = new bson.BSONPure.BSON();


export class Message {
    type: any;
    contents: { any };

    constructor(type: any, contents: any) {
        this.type = type;
        this.contents = contents;
    }

    static Encode(msg: Message) {
        var data = BSON.serialize(msg, false, true, false);
        return data;
    }

    static Decode(data: Buffer): Message {
        var obj = BSON.deserialize(data);
        if ("type" in obj && "contents" in obj) {
            return new Message(obj.type, obj.contents);
        }
    }
}
