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
        console.log("chustanu")
        let users = [];
        const idMe = req.body.idMe;
        const idYou = req.body.idYou;
        const roomName = req.body.roomName;
        const messages = req.body.messages;

        console.log(idMe, idYou, roomName, messages);

        await user
            .find({})
            .then((resp) => {
                console.log(resp)
                const users_new = resp.filter((user) => {
                    return user._id == idMe
                });

                const user_new_1 = resp.filter((user) => {
                    return user._id == idYou
                });

                users.push(users_new[0]._id);
                users.push(user_new_1[0]._id);
            })
            .catch((err) => {
                console.log('error in fetching user', err);
            });
            console.log("chand", users);
        let roomId = '';
        await Chat.find({ roomName: { $exists: true } })
            .then((resp) => {
                console.log('pls get msgs', resp);
                // res.json(resp);
                roomId = resp[resp.length - 1]._id;
            })
            .catch((err) => {
                console.log('room not present', err);
            });
        console.log('room id found ', roomId);
        if (roomId !== '') {
            await Chat.findByIdAndUpdate(
                roomId,
                {
                    messages: messages,
                },
                {new: true},
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result)
                        console.log('updated msgs');
                    }
                }
            );
        } else {
            const newChat = await new Chat({
                roomName: roomName,
                users: users,
                messages: messages,
            });

            // adding the chat into database according to roomName
            await newChat
                .save()
                .then((messages) => res.send(messages))
                .catch((err) => console.log(err));
        }
    } catch (err) {
        console.log(err);
    }
});

router.post(`/get`, async (req, res) => {
    try {
        roomName = req.body.roomName;
        console.log('get roomname', roomName);

        await Chat.find({ roomName: { $exists: true } })
            .then((resp) => {
                // console.log('pls get msgs', resp);
                res.json(resp);
            })
            .catch((err) => {
                console.log('error in fetching msgs', err);
            });
    } catch (err) {
        console.log(err);
        return users;
    }
});

module.exports = router;
