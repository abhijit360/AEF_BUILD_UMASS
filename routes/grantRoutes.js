const express = require("express");
const router = express.Router();
const Grant = require("../models/grantModel")

router.get("/", async (req,res) =>{
    const data = await Grant.find({})
    res.status(200).json({data:data})
})
router.post("/", async (req,res) =>{
    const {title, grantee, amount,schools, description=""} = req.body
    const data = await Grant.create({title, grantee, amount, schools, description})

    res.status(200).json({data: data})
})

router.get("/:id", async (req, res) =>{
    const id = req.params.id
    const data = await Grant.findById(id)
    res.status(200).json({data:data})
})

router.put("/:id", async (req,res)=>{
    const id = req.params.id
    const {title, grantee, amount,schools, description=""} = req.body
    const grant = await Grant.findOne({"_id": id})
    grant.title = title
    grant.grantee = grantee
    grant.amount = amount
    grant.schools = schools
    grant.description = description
    grant.save()
    res.status(200).json({data: grant})
})

router.delete("/:id", async (req, res) =>{
    const id = req.params.id
    const data = await Grant.findByIdAndDelete(id)
    res.status(200).json({message: data})
})

module.exports = router