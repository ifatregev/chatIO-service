const validateUser = require("../utils/validation/validateUser");
const {lookupService} = require("../services/lookupService");
const express = require('express');
const router = express.Router();


router.use(timeLog = (req, res, next) => {
    console.log('Time: ', Date.now());
    next()
});

router.get('/users', (req, res) => {
    res.send(lookupService.getUsers());
});

router.post('/users', (req, res) => {
    const {error} = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        username: req.body.username
    };
    users.push(user);
    res.send(user);
});

router.get('/users/:id', (req, res) => {
    const selectedUser = lookupService.findUserById(req.params.id);
    if (!selectedUser) {
        return res.status(404).send("User id not found");
    }
    res.send(selectedUser);
});

router.put('/users/:id', (req, res) => {
    const selectedUser = lookupService.findUserById(req.params.id);
    if (!selectedUser) {
        return res.status(404).send("User id not found");
    }

    const {error} = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        username: req.body.username
    };

    users.name = req.params.name;
    users.username = req.params.username;
    res.send(user);
});

router.post('/users/msg', (req, res) => {
    //TODO validation body req
    req.app.io.emit('message', req.body.msg);
    res.sendStatus(200);
});

module.exports = router;





//TODO
// app.route('/book')
//     .get(function (req, res) {
//         res.send('Get a random book')
//     })
//     .post(function (req, res) {
//         res.send('Add a book')
//     })
//     .put(function (req, res) {
//         res.send('Update the book')
//     })


// module.exports.userRoutes = (app, io) => {
//     app.get('/users', (req, res) => {
//         res.send(getUsers());
//     });
//
//     app.get('/users/:id', (req, res) => {
//         const selectedUser = findUserById(req.params.id);
//         if (!selectedUser) {
//             return res.status(404).send("User id not found");
//         }
//         res.send(selectedUser);
//     });
//
//     app.post('/users', (req, res) => {
//         const {error} = validateUser(req.body);
//         if (error) {
//             return res.status(400).send(error.details[0].message);
//         }
//
//         const user = {
//             id: users.length + 1,
//             name: req.body.name,
//             username: req.body.username
//         };
//         users.push(user);
//         res.send(user);
//     });
//
//     app.put('/users/:id', (req, res) => {
//         const selectedUser = findUserById(req.params.id);
//         if (!selectedUser) {
//             return res.status(404).send("User id not found");
//         }
//
//         const {error} = validateUser(req.body);
//         if (error) {
//             return res.status(400).send(error.details[0].message);
//         }
//
//         const user = {
//             id: users.length + 1,
//             name: req.body.name,
//             username: req.body.username
//         };
//
//         users.name = req.params.name;
//         users.username = req.params.username;
//         res.send(user);
//     });
//
//     app.post('/users/msg', (req, res) => {
//         io.emit('message', req.body.msg);
//         res.sendStatus(200);
//     });
//
// };

// app.post('/users/msg', (req, res) => {
//     var message = new Message(req.body);
//     message.save((err) =>{
//         if(err)
//             sendStatus(500);
//         io.emit('message', req.body);
//         res.sendStatus(200);
//     })
// });