const User = require('../models/User');

const createUser = async (userData) => {
    const user = new User(userData);
    return user.save();
};

const getUserByEmail = async (email) => {
    const user = User.findOne({ email });
    return user ?? null
};

const getUserById = async (id) => {
    const user = User.findById(id);
    return user ?? null
};

const getAllUsers = async (roleToExclude) => {
    return User.find({ role: { $ne: roleToExclude } }).select('-password');
};

const updateUserRole = async (userId, newRole) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
    );
    return updatedUser ?? null;
};

module.exports = { createUser, getUserByEmail, getUserById, getAllUsers, updateUserRole };
