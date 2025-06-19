const articleService = require('../services/article.service');

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied.' });
    }
    next();
};

const isSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'super-admin') {
        return res.status(403).json({ error: 'Access denied.' });
    }
    next();
};

const isWriter = (req, res, next) => {
    if (req.user.role === 'reader') {
        return res.status(403).json({ error: 'Access denied.' });
    }
    next();
};

const isEditor = async (req, res, next) => {
    try {
        const { role, id: userId } = req.user;

        console.log(role);
        
        if (['admin', 'editor', 'super-admin'].includes(role)) {
            return next();
        }

        if (role === 'author') {
            const article = await articleService.getArticleById(req.params.id);
            if (!article) return res.status(404).json({ error: 'Article not found' });

            if (article.author.toString() !== userId) {
                return res.status(403).json({ error: 'Access denied' });
            }
            return next();
        }

        return res.status(403).json({ error: 'Access denied' });//TODO
    } catch (err) {
        next(err);
    }
};

module.exports = { isAdmin, isSuperAdmin, isEditor, isWriter };
