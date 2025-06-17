const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectMongo = require('./config/db');
const articleRoutes = require('./routes/article.routes');
const commentRoutes = require('./routes/comment.routes');
const errorHandler = require('./config/errorHandler');
const path = require('path');
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/articles/:id/comments', commentRoutes);

// Errors
app.use(errorHandler);

module.exports = app;
