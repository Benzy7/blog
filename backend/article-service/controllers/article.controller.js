const articleService = require('../services/article.service');

const createArticle = async (req, res, next) => {
    try {
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const article = await articleService.createArticle({
            ...req.body,
            author: req.user.id,
            image: imageUrl,
        });

        res.status(201).json(article);
    } catch (err) {
        next(err);
    }
};

const getAllArticles = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await articleService.getAllArticles({ page, limit });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const getArticleById = async (req, res, next) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article not found' });
        res.json(article);
    } catch (err) {
        next(err);
    }
};

const updateArticle = async (req, res, next) => {
    try {
        const updated = await articleService.updateArticle(req.params.id, req.body, req.user);
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        await articleService.deleteArticle(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
};
