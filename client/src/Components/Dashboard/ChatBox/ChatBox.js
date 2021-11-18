import React, { useState, useEffect } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core/';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import io from 'socket.io-client';
import queryString from 'query-string';

import Navbar from '../../Home/Navbar/Navbar';
import './chatBox.css';
import Messages from './Messages';

let socket;

const ChatBox = () => {
    const [idYou, setIdYou] = useState('');
    const [nameYou, setNameYou] = useState('');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const user = JSON.parse(localStorage.getItem('profile'));
    const [idMe, setIdMe] = useState(user._id);
    const [nameMe, setNameMe] = useState(user.name);

    useEffect(() => {
        socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
            withCredentials: true,
            transports: ['websocket'],
            // , 'polling', 'flashsocket'],
        });

        const { name: nameYou, id: idYou } = queryString.parse(
            window.location.search
        );
        setNameYou(nameYou);
        setIdYou(idYou);
        console.log('socket', socket);
        // console.log("idme,", idMe);
        // console.log("idyoe,", idYou);

        socket.emit('join', { idMe: idMe, idYou: idYou }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    // function for sending messages
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

    console.log('msg', message, messages);

    return (
        <div>
            <Navbar />
            <Typography variant="h5" className="header-message">
                Chat with {nameYou}
            </Typography>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                {/* left side */}
                <Grid item md={5}>
                    <h1>Hello there</h1>
                </Grid>

                {/* right side chat window */}
                <Grid item md={6} align="right">
                    <Messages messages={messages} name={nameYou}/>
                    <Divider />

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
                            Send
                        </button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatBox;
