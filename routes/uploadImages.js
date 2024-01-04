const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");

require('dotenv').config();

import {createHmac} from "node:crypto"
import {S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand,} from "@aws-sdk/client-s3"

const bucketName= process.env.S3_BUCKET

const router = express.Router()
// const gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{ bucketName: "Images" });
// stores into memory of the server
const storage = multer.memoryStorage()
const uploadImages = multer({storage: storage})


// // delete an object into an Amazon s3 bucket
// await s3Client.send(
//     new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
//   );

//  // Put an object into an Amazon S3 bucket.
//  await s3Client.send(
//     new PutObjectCommand({
//       Bucket: bucketName,
//       Key: "my-first-object.txt",
//       Body: "Hello JavaScript SDK!",
//     })
//   );

//   // Read the object.
//   const { Body } = await s3Client.send(
//     new GetObjectCommand({
//       Bucket: bucketName,
//       Key: "my-first-object.txt",
//     })
//   );

async function connect(){
    const s3Client = new S3Client({});
    return s3Client
}

S3Client = connect();

router.post("/post", uploadImages.single("image"), async (req, res) =>{
     // Put an object into an Amazon S3 bucket.
     const image = req.file.buffer;
     const hash = createHmac('sha256', image)
                    .digest('hex');
        
     console.log(hash);

    const response = await S3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: hash,
          Body: req.file.buffer,
        })
      );        
    
    console.log("response", response)
    res.status(200).json({location: `api/image/get/${hash}`})
})

router.get("/get/:imageID", async (req,res) =>{
    
    //Put an object into an Amazon S3 bucket.
    const imageID = req.params.imageID
    const response = await S3Client.send(
        new GetObjectCommand({
            Bucket: bucketName,
            Key: imageID,
        })
    );

    console.log("response", response)
    // res.sendFile()
})
module.exports = router;



