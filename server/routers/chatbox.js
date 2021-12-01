const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');
const user = require('../models/user');

router.use(express.json());

// socket server
router.get('/', (req, res) => {
    res.send('Socket server running');
});

router.post('/add', async (req, res) => {
    try {
        let users = [];
        const idMe = req.body.idMe;
        const idYou = req.body.idYou;
        const roomName = req.body.roomName;
        const messages = req.body.messages;

        // find the two chatting users
        await user
            .find({})
            .then((resp) => {
                const users_new = resp.filter((user) => {
                    return user._id == idMe;
                });

                const user_new_1 = resp.filter((user) => {
                    return user._id == idYou;
                });

                users.push(users_new[0]._id);
                users.push(user_new_1[0]._id);
            })
            .catch((err) => {
                console.log('error in fetching user', err);
            });

        let roomId = '';

        // find roomId by the roomName in Chat model
        await Chat.find({ roomName })
            .then((resp) => {
                roomId = resp[0]._id;
            })
            .catch((err) => {
                console.log('room not present', err);
            });

        // if room exists update the messages
        if (roomId !== '') {
            await Chat.findByIdAndUpdate(
                roomId,
                {
                    messages: messages,
                },
                { new: true },
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // console.log('updated msgs');
                    }
                }
            );
        }
    } catch (err) {
        console.log(err);
    }
});

router.post(`/get`, async (req, res) => {
    try {
        let users = [];
        const idMe = req.body.idMe;
        const idYou = req.body.idYou;
        const roomName = req.body.roomName;
        const messages = req.body.messages;

        // find the two chatting users
        await user
            .find({})
            .then((resp) => {
                const users_new = resp.filter((user) => {
                    return user._id == idMe;
                });

                const user_new_1 = resp.filter((user) => {
                    return user._id == idYou;
                });

                users.push(users_new[0]._id);
                users.push(user_new_1[0]._id);
            })
            .catch((err) => {
                console.log('error in fetching user', err);
            });

        console.log('get roomname', roomName);

        let roomId = '';
        let response;

        // find the roomId form the roomName and set roomId according to it for a single room
        await Chat.find({ roomName })
            .then((resp) => {
                // console.log('get resp in chat', resp);
                response = resp;
                if (resp !== []) roomId = resp[0]._id;
            })
            .catch((err) => {
                console.log('room not present', err);
            });

        // if room is new create it
        if (roomId === '') {
            const newChat = await new Chat({
                roomName,
                users,
                messages,
            });

            // adding the chat into database according to roomName
            await newChat
                .save()
                .then(() =>
                    res.send([
                        {
                            roomName,
                            users,
                            messages: [
                                { user: 'System', text: 'hey new bois' },
                            ],
                        },
                    ])
                )
                .catch((err) => console.log(err));
        } else {
            res.json(response);
        }
    } catch (err) {
        console.log(err);
        return users;
    }
});

module.exports = router;
