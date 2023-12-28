const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const Post = require("../models/postModel");





router.get("/", async (req,res) =>{
    try{
        const response = await Post.find({});
        res.status(200).json(response)
    }catch(error){
        res.status(404).json(error);
    }
})

router.get("/:id", async (req, res) =>{
    try{
        const response = await Post.find({id: req.params.id})
        res.status(200).json(response)
    }catch(error){
        res.status(404).json(error);
    }
})

router.put("/:id", async (req,res)=>{
    try{
        const {title, content, author, date, image_url} = req.body
        const original_post = await Post.findOne({id: req.params.id})

        original_post.title = title;
        original_post.content = content;
        original_post.author = author;
        original_post.date = date;
        original_post.image_url = image_url;
        await original_post.save();

        res.status(200).json({message: `updated post with id: ${req.params.id}`, updatedPost: original_post})
    }catch(error){
        console.log("error",error)
    }
})

router.delete("/:id", async (req, res) =>{
    try{
        const delete_post = await Post.findOneAndDelete({id: req.params.id})
        if(!delete_post){
            return res.status(404).json({message: `Post with id ${req.params.id} not found`});
        }
        // await post.deleteOne(original_post)
        res.status(200).json({message: `Deleting post with id ${req.params.id}`, deletedPost: delete_post})
    }catch(error){
        console.error("Error:", error);
        res.status(404).json({message: "error"})
    }
})

module.exports = router