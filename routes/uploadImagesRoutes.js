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
     const fileExtension = req.file.originalname.split('.').pop();
     const hash = crypto.createHmac('sha256', image)
                    .digest('hex');
        
     console.log("imagehash:",hash);
     console.log('awsurl:', AWS_URL + `/${hash}`)
     console.log('extension', fileExtension)
   
    try{
        const response = await axios.put(
            AWS_URL + `/${hash}`,  // url
            req.file, //file body
            {
                headers: {'Content-Type': `image/${fileExtension}`},
            },
        )
        // console.log("response", response)
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
    // res.redirect( AWS_URL + `/${req.params.imageID}`)
    try{
        const response = await axios.get(
            AWS_URL + `/${req.params.imageID}`,
            { responseType: "blob" }
        )
        // console.log(response)
        console.log(response.headers)
        res
        .status(200)
        .setHeader("Content-Type", response.headers["content-type"])
        .setHeader("Content-length", response.headers["content-length"])
        .send(response.data);
    }catch(error){
        res.status(400).json({error:error})
    }
})

module.exports = router;



