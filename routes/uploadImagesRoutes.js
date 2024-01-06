const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const crypto = require("node:crypto");
const axios = require("axios");

require('dotenv').config();


const AWS_URL = process.env.AWS_UPLOAD_URL

const router = express.Router()

const storage = multer.memoryStorage()
const uploadImages = multer({storage: storage})


router.post("/", uploadImages.single("image"), async (req, res) =>{
     // Put an object into an Amazon S3 bucket.
     const image = req.file.buffer;
     const hash = crypto.createHmac('sha256', image)
                    .digest('hex');
        
     console.log("imagehash:",hash);
     console.log('awsurl:', AWS_URL + `/${hash}`)
   
    try{
        const response = await axios.put(
            AWS_URL + `/${hash}`,  // url
            req.file.buffer, //file body
            {
                headers: {'Content-type': "multipart/form-data"},
            },
        )
        console.log("response", response)
        res.status(200).json({imageID: `${hash}`})
    }catch(error){
        console.log(error);
        res.status(400).json({error: error})
    }
})

router.delete('/:imageID', async (req,res)=>{
    try{
    const response = await axios.delete(
        AWS_URL + `/${req.params.imageID}`
    )
    console.log("response", response)
    res.status(200).json({data: `deleted ${req.params.imageID}`})
    } catch(error){
        console.log(error);
        res.status(400).json({error:error})
    }
})

router.get('/:imageID', async (req,res) =>{
    try{
        const response = await axios.get(
            AWS_URL + `/${req.params.imageID}`
        )
        res.status(200).json({data: response.data})
    }catch(error){
        res.status(400).json({error:error})
    }
})

module.exports = router;



