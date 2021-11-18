import React, { useState, useEffect } from 'react';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import io from 'socket.io-client';
import queryString from 'query-string';
import {
    Card,
    CardContent,
    CardMedia,
    Skeleton,
    Stack,
    Grid,
    Typography,
    Divider,
} from '@mui/material';

import Navbar from '../../Home/Navbar/Navbar';
import Messages from './Messages';

import './chatBox.css';

let socket;

const ChatBox = () => {
    // Names and IDs of the two users
    const [idYou, setIdYou] = useState('');
    const [nameYou, setNameYou] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'));
    const [idMe, setIdMe] = useState(user._id);
    const [nameMe, setNameMe] = useState(user.name);

    // single message
    const [message, setMessage] = useState('');
    // array of the messages
    const [messages, setMessages] = useState([]);

    // random soothing image
    const imageKeyArr = [
        'https://www.thebritishacademy.ac.uk/media/images/Project_Soothe_1_0.width-592.jpg',
        'https://images.unsplash.com/photo-1605125950879-a81fe58d8439?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwc2NlbmVyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
        'https://i.insider.com/5f74b6a80ab50d00184ad4f6',
        'https://cdn2.cincinnatimagazine.com/wp-content/uploads/sites/5/2020/10/Photograph-by-leekrisadobe.stock_.com_-1024x683.jpg',
        'https://i.pinimg.com/originals/2f/20/ae/2f20ae82d5f2536db672a40a81ef6fc3.jpg',
        'https://i.pinimg.com/originals/89/02/db/8902db34c71af73b99c8a14e7841f0ca.jpg',
        'https://i.pinimg.com/originals/b9/5d/54/b95d54f8b0c5a1d01521f4647bf812ea.jpg',
        'https://i.pinimg.com/originals/31/86/f4/3186f45e48d5e71354b65c8f31eeafe6.jpg',
        'https://i.pinimg.com/564x/d8/23/83/d8238334e5d1273e25d6d14336a968f8.jpg',
    ];
    const imageKey =
        imageKeyArr[Math.floor(Math.random() * (imageKeyArr.length - 1))];

    useEffect(() => {
        // connect socket.io to backend
        socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
            withCredentials: true,
            transports: ['websocket'],
            // , 'polling', 'flashsocket'],
        });

        // parse id of the current user
        const { name: nameYou, id: idYou } = queryString.parse(
            window.location.search
        );

        setNameYou(nameYou);
        setIdYou(idYou);
        console.log('socket', socket);

        // emit the event on joining the room
        socket.emit('join', { idMe: idMe, idYou: idYou }, (error) => {
            if (error) {
                alert(error);
            }
        });

        // close connection upon leaving the socket
        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []);

    useEffect(() => {
        // update page upon updation of the message array
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    // function for sending messages to message area
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit(
                'sendMessage',
                { message: message, idMe: idMe, idYou: idYou },
                () => setMessage('')
            );
        }
    };

    // console.log('messages', message, messages);

    return (
        <div>
            <Navbar />
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                pt={2}
                mb={4}
            >
                {/* left side */}
                <Grid item xs={11} md={4}>
                    <Card sx={{ minWidth: 225 }}>
                        {/* Daily changing image */}
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 16 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Hey There 😄 !!!
                            </Typography>

                            {/* Show image after daily. */}
                            <CardMedia
                                component="img"
                                height="460vh"
                                image={imageKey}
                                alt="Nice Image"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* right side chat window */}
                <Grid item xs={11} md={7} align="right">
                    <Messages
                        className="messageArea"
                        messages={messages}
                        nameMe={nameMe}
                        nameYou={nameYou}
                    />
                    <Divider />

                    {/* input for sending chats */}
                    <form className="form">
                        <input
                            className="input"
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={({ target: { value } }) =>
                                setMessage(value)
                            }
                            onKeyPress={(event) =>
                                event.key === 'Enter'
                                    ? sendMessage(event)
                                    : null
                            }
                        />
                        <button
                            className="sendButton"
                            onClick={(e) => sendMessage(e)}
                        >
                            <SendRoundedIcon />
                        </button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatBox;
