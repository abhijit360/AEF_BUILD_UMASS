const express = require("express");
const router = express.Router();
const Sponsor = require("../models/sponsorModel");

router.get("/", async (req,res) =>{
    const response = await Sponsor.find({});
    res.status(200).json({data: response})
})
router.post("/", async (req,res) =>{
    const { name, amount = '' ,logo = '', date_from=null, date_to=null} = req.body
    const response = await Sponsor.create({name,amount,logo,date_from,date_to});
    res.status(200).json({data: response})
})

router.get("/:id", async (req, res) =>{
    const id = req.params.id
    const response = await Sponsor.findById(id);
    res.status(200).json({data:response})
})

router.put("/:id", async (req,res)=>{
    const id = req.params.id
    const { name, amount = '' ,logo = '', date_from=null, date_to=null} = req.body
    const sponsor = await Sponsor.findOne({"_id":id});
    if(name != null){
        sponsor.name = name;    
    }
    if(amount.length != 0 )
        sponsor.amount = amount;
    if(logo.length != 0)
        sponsor.logo = logo;
    if(date_from != null){
        sponsor.date_from = date_from
    }
    if(date_to != null){
        sponsor.date_to = date_to
    }
    
    sponsor.save();
    
    res.status(200).json({data: sponsor})
})

router.delete("/:id", async (req, res) =>{
    const id = req.params.id;
    const data = await Sponsor.findByIdAndDelete(id)
    res.status(200).json({data: data})
})

module.exports = router