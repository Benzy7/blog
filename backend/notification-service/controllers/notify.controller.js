const handleNotify = (io) => async (req, res, next) => {
    try {
        const { userId, message, type } = req.body;
        if (!userId || !message) {
            res.status(400);
            throw new Error('userId and message are required');
        }

        io.to(userId).emit('notification', {
            message,
            type: type || 'info',
            timestamp: Date.now() 
        });
        
        console.log(`Sent notification to ${userId}:`, message);
        res.status(200).json({ message: 'Notification sent' });
    } catch (err) {
        next(err);
    }
};

module.exports = handleNotify;