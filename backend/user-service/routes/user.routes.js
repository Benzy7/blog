const express = require('express');
const userController = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/permissions.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { updateUserRoleSchema } = require('../validators/user.validator');
 
const router = express.Router();

router.get('/', isAuthenticated, isAdmin, userController.getUsers);
router.put('/:userId/role', isAuthenticated, isAdmin, validate(updateUserRoleSchema), userController.updateUserRole);

module.exports = router;
