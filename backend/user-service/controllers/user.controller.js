const userService = require('../services/user.service');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers('super-admin');
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const updateUserRole = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { role: newRole } = req.body;

        const updatedUser = await userService.updateUserRole(userId, newRole);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User role updated successfully', user: updatedUser });
    } catch (err) {
        next(err);
    }
};

module.exports = { getUsers, updateUserRole };
