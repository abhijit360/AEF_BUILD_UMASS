const express = require("express");
const router = express.Router();
const db = require("../conn.js")


router.get("/", async (req,res) =>{
    let collection = await db.collections("test");
    console.log(await collection.find({}))
    res.status(200).json({message: "get post"})
})

router.get("/:id", (req, res) =>{
    res.status(200).json({message: `get post with id ${req.params.id}`})
})

router.put("/:id", (req,res)=>{
    res.status(200).json({message: `updating post with id: ${req.params.id}`})
})

router.delete("/:id", (req, res) =>{
    res.status(200).json({message: `Deleting post with id ${req.params.id}`})
})

module.exports = router