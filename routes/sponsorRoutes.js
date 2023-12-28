const express = require("express");
const router = express.Router();

router.get("/", (req,res) =>{
    res.status(200).json({message: "get sponsor"})
})

router.get("/:id", (req, res) =>{
    req.
    res.status(200).json({message: `get sponsor with id ${req.params.id}`})
})

router.put("/:id", (req,res)=>{
    res.status(200).json({message: `updating sponsor with id: ${req.params.id}`})
})

router.delete("/:id", (req, res) =>{
    res.status(200).json({message: `Deleting sponsor with id ${req.params.id}`})
})

module.exports = router