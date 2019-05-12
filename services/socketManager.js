const {lookupService} = require("../services/lookupService");
const {msgService} = require("../services/msgService");


module.exports = (socket) => {

// Returning the initial data of users list(in the future from db collection)
    socket.on('init', () => {
        console.log("init");
        const users = lookupService.getUsers();
        for(let x = 0; x < users.length; ++x) {
            if (!lookupService.getSocketId(x)){
                lookupService.setSocketId(x, socket.id);
                break;
            }
        }
        socket.emit("get_data", {users, socket: socket.id});
        socket.emit("get_msg", msgService.getMessages());
    });

// Sending a massage, called from /src/chat/ChatForm.js of Frontend
    socket.on('send_msg', (data) => {
        console.log("msg received", data);
        const chatMessages = msgService.saveMessage(data, socket.id);
        socket.broadcast.emit("get_msg", chatMessages);
        socket.emit("get_msg", chatMessages); //io.sockets
    });

// disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
};




//TODO SOCKET SERVICE
// class SocketService {
//     constructor(socket) {
//         this.socket = socket;
//     }
// }
// const socket = new SocketService('ws://localhost:8080');

// module.exports = (socket) => {
//     console.log("socket id: ", socket.id);
//
// // Returning the initial data of users list(in the future from db collection)
//     socket.on('init', () => {
//         console.log("init");
//         const users = getUsers();
//         socket.emit("get_data", users);
//     });
//
// // Sending a massage, called from /src/../__.js of Frontend
//     socket.on('send_msg', (msg) => {
//         console.log("msg received", msg);
//
//         socket.emit("get_msg", msg); //io.sockets
//     });
//
// // disconnect is fired when a client leaves the server
//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// };
