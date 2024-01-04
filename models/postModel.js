const mongoose = require("mongoose");
const {Schema} = mongoose

const postSchema = new Schema({
    title: String,
    subtitle: String,
    synopsis: String,
    author: String,
    authorImgID: String,
    content: String,
    contentImgID: String,
    tags: [String],
    images: [String],
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now }
    })

module.exports =  mongoose.model("Post", postSchema);