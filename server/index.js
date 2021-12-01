// importing all the necessary files for backend implementation

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const http = require('http');

// socket route functions
const { getUser } = require('./routers/chatusers');
const { verifyKey } = require('./helper/spamCheck');

dotenv.config();

// for deployment
const PORT = process.env.PORT || 3001;

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

let roomName;
// connect user to the room for chat
io.on('connection', (socket) => {
    console.log('New Connection on SocketIO');

    socket.on('join', async ({ idMe, idYou }, callback) => {
        const users = await getUser({
            id: socket.id,
            idMe: idMe,
            idYou: idYou,
        });

        let error = 'Error joining in room. Please try again later.';
        if (users === []) return callback(error);

        // roomName is concatenation of the two users' id
        // users[0] is host(Me), users[1] is Guest(You)

        if (users[0]._id < users[1]._id) roomName = users[0]._id + users[1]._id;
        else roomName = users[1]._id + users[0]._id;

        console.log(roomName, 'rooomiieee');
        socket.join(roomName);

        // socket.emit('message', {
        //     user: 'System',
        //     text: `${users[0].name},  ${users[1].name} welcomes you.`,
        // });
        
        // broadcast to everyone but that member that he has joined
        socket.broadcast.to(roomName).emit('message', {
            user: 'System',
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

        let error = 'Error sending messages in room. Please try again later.';
        if (users === []) return callback(error);

        io.to(roomName).emit('message', { user: users[0].name, text: message });

        callback();
    });

    socket.on('disconnect', async (callback) => {
        console.log('User left Socket');
    });
});

// Verifying Spam removal Key
verifyKey();

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
        server.listen(PORT, () =>
            console.log(`Socket and Server has started on PORT : ${PORT}`)
        );
    })
    .catch((error) => console.log(`${error} did not connect`));
