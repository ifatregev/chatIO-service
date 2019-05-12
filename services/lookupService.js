let users = [
    {id: 0, name: "Adam", username: "RockON", socketId: null},
    {id: 1, name: "Ben", username: "RockOFF", socketId: null},
    {id: 2, name: "Jenny", username: "Hero", socketId: null}
    ];

class LookupService {
    constructor(users) {
        this.users = users;
    }

    getUsers(){
        return this.users;
    }

    setSocketId(userId, socketId){
        const user = this.users.find(user => user.id === parseInt(userId));
        user.socketId = socketId;
        return this.users;
    }

    getSocketId (userId){
        const user = this.users.find(user => user.id === parseInt(userId));
        // const user = findUserById(userId);
        return user.socketId;
    }

    findUserById(userId){
        return this.users.find(user => user.id === parseInt(userId));
    }

    findUserBySocket(socketId){
        return this.users.find(user => user.socketId === socketId);
    }
}

const lookupService = new LookupService(users);
module.exports.lookupService = lookupService;







// module.exports.getUsers = () => {
//     return users;
// };
//
// module.exports.setSocketId = (userId, socketId) => {
//     const user = users.find(user => user.id === parseInt(userId));
//     user.socketId = socketId;
//     return users;
// };
//
// module.exports.getSocketId = (userId) => {
//     const user = users.find(user => user.id === parseInt(userId));
//     // const user = findUserById(userId);
//     return user.socketId;
// };
//
// module.exports.findUserById = (userId) => {
//     return users.find(user => user.id === parseInt(userId));
// };
//
// module.exports.findUserBySocket = (socketId) => {
//     return users.find(user => user.socketId === socketId);
// };
