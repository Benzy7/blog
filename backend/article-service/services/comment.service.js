const Comment = require('../models/Comment');

const createComment = async (data) => {
    return await Comment.create(data);
};

const getCommentsByArticle = async (articleId) => {
    const comments = await Comment.find({ article: articleId }).sort({ createdAt: -1 }).lean();

    const map = {};
    comments.forEach(c => { c.replies = []; map[c._id] = c; });
    const roots = [];
    comments.forEach(c => {
        if (c.parent) map[c.parent]?.replies.push(c);
        else roots.push(c);
    });
    return roots;
};

module.exports = { createComment, getCommentsByArticle };
