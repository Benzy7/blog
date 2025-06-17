const express = require('express');
const router = express.Router({ mergeParams: true });

const commentController = require('../controllers/comment.controller');
const isAuthenticated = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { createCommentSchema } = require('../validators/comment.validator');

router.post('/', isAuthenticated, validate(createCommentSchema), commentController.createComment);
router.get('/', isAuthenticated, commentController.getCommentsByArticle);

module.exports = router;
