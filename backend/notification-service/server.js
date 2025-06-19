require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');
const jwtAuth = require('./middlewares/auth.middleware');
const createNotifyRoutes = require('./routes/notify.routes');
const errorHandler = require('./config/errorHandler');
const apiRateLimiter = require('../article-service/config/rateLimiter');

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
});

// Middlewares
app.use(apiRateLimiter);
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
if (process.env.ENV === 'dev') {
    app.use(morgan('dev'));
} else if (process.env.ENV === 'prod') {
    app.use(morgan('combined'));
}

// Routes
app.use('', createNotifyRoutes(io));

// Errors
app.use(errorHandler);

const userSockets = new Map();
io.use(jwtAuth);
io.on('connection', (socket) => {
    const userId = socket.user.id;

    socket.join(userId);
    userSockets.set(userId, socket);

    console.log(`✅ Socket connected: user=${userId}, socketId=${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`❌ Socket disconnected: user=${userId}, socketId=${socket.id}`);
        userSockets.delete(userId);
    });
});

app.post('/notify', (req, res) => {
    console.log('11111111111111111115166516')
    const { userId, message, type } = req.body;

    io.to(userId).emit('notification', {
        message,
        type,
        timestamp: Date.now()
    });

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
