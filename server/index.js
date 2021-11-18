// importing all the necessary files for backend implementation

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const http = require('http');

dotenv.config();

// for deployment
const PORT = process.env.PORT || 3001;
const PORT2 = process.env.PORT2 || 3002;

// using body-parser to parse the data
app.use(body_parser.json());
app.use(body_parser.urlencoded());
app.use(cors());

const server = http.createServer(app);
// const io = socketio(server);
const io = socketio(server, {
    cors: {
        origin: '*:*',
        methods: ['GET', 'POST', 'PUT'],
        transports: ['websocket'],
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('New Connection on SocketIO');

    socket.on('join', async ({ idMe, idYou }, callback) => {
        const users = await getUser({
            id: socket.id,
            idMe: idMe,
            idYou: idYou,
        });

        let error = false;
        // if (users == null) return callback(error);
        console.log('room users', users);

        // roomName is concatenation of the two users' name
        // users[0] is host(Me), users[1] is Guest(You)

        let roomName =
            users[0].name.trim().toLowerCase() +
            users[1].name.trim().toLowerCase();
        console.log(roomName, 'rooomiieee');
        socket.join(roomName);

        socket.emit('message', {
            user: 'admin',
            text: `${users[0].name},  ${users[1].name} welcomes you.`,
        });
        socket.broadcast.to(roomName).emit('message', {
            user: 'admin',
            text: `${users[1].name} has joined!`,
        });

        io.to(roomName).emit('roomData', {
            room: roomName,
            users: users,
        });

        callback();
    });

    socket.on('sendMessage', async ({ message, idMe, idYou }, callback) => {
        const users = await getUser({
            id: socket.id,
            idMe: idMe,
            idYou: idYou,
        });
        let roomName =
            users[0].name.trim().toLowerCase() +
            users[1].name.trim().toLowerCase();

        io.to(roomName).emit('message', { user: users[1].name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User left Socket');
        let roomName =
            users[0].name.trim().toLowerCase() +
            users[1].name.trim().toLowerCase();

        // const user = removeUser(socket.id);

        // if (user) {
        //     io.to(user.room).emit('message', {
        //         user: 'Admin',
        //         text: `${user.name} has left.`,
        //     });
        //     io.to(user.room).emit('roomData', {
        //         room: user.room,
        //         users: getUsersInRoom(user.room),
        //     });
        // }
    });
});

const { getUser } = require('./routers/chatusers');

// importing all the routers
const chatboxRouter = require('./routers/chatbox');
const askSomethingQuestionRouter = require('./routers/askSomethingQuestion');
const askSomethingAnswerRouter = require('./routers/askSomethingAnswer');
const experienceRouter = require('./routers/experience');
const studyMaterialRouter = require('./routers/studyMaterial');
const dashboardRouter = require('./routers/dashboard');
const authRouter = require('./routers/auth');

// adding routes for each of them, it will work relatively
app.use('/chatbox', chatboxRouter);
app.use('/ask-something/question', askSomethingQuestionRouter);
app.use('/ask-something/answer', askSomethingAnswerRouter);
app.use('/experience', experienceRouter);
app.use('/study-material', studyMaterialRouter);
app.use('/dashboard', dashboardRouter);
app.use('/', authRouter);

// mongodb URL
const CONNECTION_URL =
    'mongodb+srv://MeetYourDronacharya:MeetYourDronacharya@cluster0.twf3b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// connecting to mongodb database and starting server
mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to mongo_db');
        // app.listen (PORT, () => console.log (`Server Running on Port: ${PORT}`));
        server.listen(PORT, () =>
            console.log(`Socket and Server has started on PORT : ${PORT}`)
        );
    })
    .catch((error) => console.log(`${error} did not connect`));
