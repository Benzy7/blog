const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Error:', err);

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Expired token' });
    }
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
        stack: process.env.ENV === 'dev' ? err.stack : undefined,
    });
};

module.exports = errorHandler;
