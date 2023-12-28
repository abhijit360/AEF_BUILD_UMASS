const mongoose = require("mongoose");
const {Schema} = mongoose

const postSchema = new Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String},
    date: { type: String , required: true},
    image_url: { type: String }
})

module.exports =  mongoose.model("Post", postSchema);