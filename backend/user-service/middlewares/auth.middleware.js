const tokenService = require('../services/token.service');

const isAuthenticated = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ error: 'No token provided' });

    const token = header.split(' ')[1];
    
    try {
        const decoded = tokenService.verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {        
        next(err)
    }
};

module.exports = isAuthenticated;
