const userService = require('../services/user.service');
const tokenService = require('../services/token.service');

const register = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password, dateOfBirth } = req.body;
        const existing = await userService.getUserByEmail(email);
        if (existing) return res.status(400).json({ error: 'Email already in use' });

        const newUser = await userService.createUser({ username, firstName, lastName, email, password, dateOfBirth });
        res.status(201).json({ id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        res.json({ accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
};

const getConnectedUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const userObj = user.toObject()
        const { password, ...profile } = userObj;
        res.json(profile);
    } catch (err) {
        next(err);
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ error: 'No refresh token provided' });

        const payload = await tokenService.verifyRefreshToken(refreshToken);
        if (!payload) return res.status(401).json({ error: 'Invalid refresh token' });

        const user = await userService.getUserById(payload.id);
        if (!user) return res.status(401).json({ error: 'User not found' });

        const newAccessToken = tokenService.generateAccessToken(user);

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, getConnectedUser, refreshToken };
