const express = require('express');
const router = express.Router();
const handleNotify = require('../controllers/notify.controller');

module.exports = (io) => {
    router.post('/notify', express.json(), handleNotify(io));
    return router;
};
