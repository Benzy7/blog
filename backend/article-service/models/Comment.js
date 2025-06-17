const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, trim: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
}, { timestamps: true });

CommentSchema.index({ article: 1 });

module.exports = mongoose.model('Comment', CommentSchema);
