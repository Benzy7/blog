const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article.controller');
const isAuthenticated = require('../middlewares/auth.middleware');
const { isAdmin, isEditor, isWriter } = require('../middlewares/permissions.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { createArticleSchema, updateArticleSchema } = require('../validators/article.validator');
const upload = require('../middlewares/upload.middleware');

router.post('/', isAuthenticated, isWriter, upload.single('image'), validate(createArticleSchema), articleController.createArticle);
router.get('/', isAuthenticated, articleController.getAllArticles);
router.get('/:id', isAuthenticated, articleController.getArticleById);
router.put('/:id', isAuthenticated, isEditor, upload.single('image'), validate(updateArticleSchema), articleController.updateArticle);
router.delete('/:id', isAuthenticated, isAdmin, articleController.deleteArticle);

module.exports = router;
