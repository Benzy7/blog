const axios = require('axios');

const notifyAuthor = async ({ userId, type, message, payload = {} }) => {
  try {
    await axios.post(process.env.NOTIF_SERVICE_URL + '/notify', {
      userId,
      type,
      message,
      ...payload
    });
  } catch (err) {
    console.error('Notification error:', err.message);
  }
};

module.exports = notifyAuthor;