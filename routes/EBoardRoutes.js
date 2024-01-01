const express = require("express");
const router = express.Router();
const Eboard = require("../models/EBoardModel")

router.get("/", async (req,res) =>{
    const data = await Eboard.find({})
    res.status(200).json({data:data})
})

router.put("/", async (req, res) =>{
    const data = { president, vice_president,treasurer,directors} = req.body
    const eboard = await Eboard.findOne();
    eboard.president = president;
    eboard.vice_president = vice_president;
    eboard.treasurer = treasurer;
    eboard.directors = directors;
    eboard.save();
    res.status(200).json({data:eboard})
})



module.exports = router
