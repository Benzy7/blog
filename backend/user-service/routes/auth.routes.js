const express = require('express');
const authController = require('../controllers/auth.controller');
const { registerSchema, loginSchema, refreshSchema } = require('../validators/user.validator');
const isAuthenticated = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/get-connected', isAuthenticated, authController.getConnectedUser);
router.post('/refresh', validate(refreshSchema), authController.refreshToken);

module.exports = router;
