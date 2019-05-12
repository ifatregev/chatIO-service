const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const SocketManager = require("./services/socketManager");
const users = require("./routing/routesUsers");


const port = process.env.PORT || 8000;
const app = module.exports.app = express();
const server = http.createServer(app);
const io = module.exports.io = socketIO(server);  //TODO SINGLETON???

io.on("connection", SocketManager);
app.io = io;
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/chat', users);

server.listen(port, () => console.log(`Listening on port ${port}`));






// var server = app.listen(3000, () => {
//     console.log('server is running on port', server.address().port);
// });
