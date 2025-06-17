const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectMongo = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./config/errorHandler');
const apiRateLimiter = require('./config/rateLimiter');

const app = express();

// DB
connectMongo();

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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Errors
app.use(errorHandler);

module.exports = app;
