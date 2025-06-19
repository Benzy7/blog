const commentService = require('../services/comment.service');
const articleService = require('../services/article.service');
const notifyAuthor = require('../utils/notif');


const createComment = async (req, res, next) => {
    try {
        const articleId = req.params.id;
        const userId = req.user.id;
        
        const author = await articleService.getArticleAuthor(articleId);
        if (!author) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const comment = await commentService.createComment({
            article: articleId,
            author: userId,
            content: req.body.content,
            parent: req.body.parent || null
        });

        if (author.toString() !== userId) {
            await notifyAuthor({
                userId: author.toString(),
                type: 'new-comment',
                message: 'New comment on your article',
                payload: { 
                    articleId: articleId,
                    commentId: comment._id,
                    commentor: userId 
                }
            });
        }
        
        res.status(201).json(comment);
    } catch (err) {
        next(err);
    }
};

const getCommentsByArticle = async (req, res, next) => {
    try {
        const comments = await commentService.getCommentsByArticle(req.params.id);
        res.json(comments);
    } catch (err) {
        next(err);
    }
};

module.exports = { createComment, getCommentsByArticle };
