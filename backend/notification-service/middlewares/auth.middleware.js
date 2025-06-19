const jwt = require('jsonwebtoken');

module.exports = (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication error: No token provided'));
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = payload;
        next();
    } catch (err) {
        next(new Error('Authentication error: Invalid token'));
    }
};
