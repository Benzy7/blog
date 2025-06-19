const Article = require('../models/Article');
const commentService = require('../services/comment.service');

const createArticle = async (data) => {
    return await Article.create(data);
};

const getAllArticles = async ({ page, limit }) => {
    const skip = (page - 1) * limit;

    const total = await Article.countDocuments();

    const articles = await Article.aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: Number(limit) },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'article',
                as: 'comments'
            }
        },
        { $addFields: { commentsCount: { $size: '$comments' } } },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        },
        { $unwind: { path: '$author', preserveNullAndEmptyArrays: true } },
        { $project: { comments: 0, 'author.password': 0 } }
    ]);

    return {
        articles,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
    };
};

const getArticleById = async (id) => {
    const article = await Article.findById(id).lean();
    if (!article) return null;

    const comments = await commentService.getCommentsByArticle(id);
    return { ...article, comments };
};

const getArticleAuthor = async (id) => {
    const article = await Article.findById(id).select('author');
    return article ? article.author : null
};

const updateArticle = async (id, data) => {
    console.log(data);
    
    const article = await Article.findByIdAndUpdate(id, data, { new: true });

    if (!article) {
        throw new Error('Article not found');
    }

    return article;
};

const deleteArticle = (id) => Article.findByIdAndDelete(id);

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    getArticleAuthor,
    updateArticle,
    deleteArticle,
};
