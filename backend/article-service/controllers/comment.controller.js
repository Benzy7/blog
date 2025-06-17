const commentService = require('../services/comment.service');
const articleService = require('../services/article.service');
const axios = require('axios');

// const notifyAuthor = async (comment) => {
//     try {
//         const author = await articleService.getArticleAuthor(comment.article).select('author');
//         if (!author) return;

//         await axios.post(
//             process.env.NOTIF_SERVICE_URL + '/notify',
//             {
//                 userId: author,
//                 comment
//             }
//         );
//     } catch (err) {
//         next(err);
//     }
// };

const createComment = async (req, res, next) => {
    try {
        const data = {
            article: req.params.id,
            author: req.user.id,
            content: req.body.content,
            parent: req.body.parent || null
        };
        const comment = await commentService.createComment(data);
        //notifyAuthor(comment);
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
