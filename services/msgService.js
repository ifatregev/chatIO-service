const {lookupService} = require("./lookupService");

let messages = [];

class MsgService {
    constructor(messages) {
        this.messages = messages;
    }

    getMessages(){
        return this.messages;
    }

    saveMessage(msg, socketId){
        const user = lookupService.findUserBySocket(socketId);
        const message = {
            id: this.messages.length + 1,
            text: msg,
            user: user.name
        };
        this.messages.push(message);
        return this.messages;
    };
}

const msgService = new MsgService(messages);
module.exports.msgService = msgService;



// module.exports.getMessages = () => {
//     return messages;
// };
//
// module.exports.saveMessage = (msg, socketId) => {
//     const user = findUserBySocket(socketId);
//     console.log("user from save msg:", user, "socket: ", socketId);
//     const message = {
//         id: messages.length + 1,
//         text: msg,
//         user: user.name
//     };
//     messages.push(message);
//     return messages;
// };

// module.exports.clearMessages = () => {
//     messages = [];
// };
