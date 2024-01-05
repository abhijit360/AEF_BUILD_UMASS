const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const crypto = require("node:crypto");
const {S3Client,
        PutObjectCommand,
        DeleteObjectCommand,
        paginateListObjectsV2,
        GetObjectCommand,} = require("@aws-sdk/client-s3");

require('dotenv').config();

// import {S3Client,
//     PutObjectCommand,
//     CreateBucketCommand,
//     DeleteObjectCommand,
//     DeleteBucketCommand,
//     paginateListObjectsV2,
//     GetObjectCommand,} from "@aws-sdk/client-s3"

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
    const s3Client = new S3Client({
        region: process.env.S3_REGION,
        credentials:{
            aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
            aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY
        },

    });
    return s3Client
}

let S3_Client; 
async function initializeS3Client() {
    S3_Client = await connect();
};

initializeS3Client();


router.post("/post", uploadImages.single("image"), async (req, res) =>{
     // Put an object into an Amazon S3 bucket.
     const image = req.file.buffer;
     const hash = crypto.createHmac('sha256', image)
                    .digest('hex');
        
     console.log(hash);

    const response = await S3_Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: hash,
          Body: req.file.buffer,
        })
      );        
    
    console.log("response", response)
    res.status(200).json({imageID: `${hash}`})
})

router.get("/get/:imageID", async (req,res) =>{
    
    //Put an object into an Amazon S3 bucket.
    const imageID = req.params.imageID
    const response = await S3_Client.send(
        new GetObjectCommand({
            Bucket: bucketName,
            Key: imageID,
        })
    );

    console.log("response", response)
})

router.delete("/:imageID", async (req,res) =>{
    const response = await S3_Client.send(
    new DeleteObjectCommand({ Bucket: bucketName, Key: req.params.imageID})
  );
  console.log("response",response);
})
module.exports = router;



