const mongoose = require('mongoose');
const Users = require('./userSchema')

const postSchema = new mongoose.Schema({
    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true,
    },

    content:{
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;