// this is the page for the admin to view and to make changes
const express = require("express");
const router = express.Router();

router.get("/", (req,res) =>{
    res.status(200).json({message: "get"})
})

router.get("/:id", (req, res) =>{
    req.
    res.status(200).json({message: `get post with id ${req.params.id}`})
})

router.put("/:id", (req,res)=>{
    res.status(200).json({message: `updating post with id: ${req.params.id}`})
})

router.delete("/:id", (req, res) =>{
    res.status(200).json({message: `Deleting post with id ${req.params.id}`})
})

module.exports = router