const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const gfsStream = require("gridfs-stream")

const router = express.Router()
// const gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{ bucketName: "Images" });

const storage = multer.memoryStorage()
const uploadImages = multer({storage: storage})

// stores into memory of the server

router.post("/image",uploadImages.single("photo"), (req, res) =>{
    try{
        const gfs = new gfsStream.Grid(mongoose.connection, mongoose.mongo);
        const writeStream = gfs.createWriteStream({
            filename: req.file.originalname,
            mode:"w",
            content_type: req.file.mimetype
        });

        const readStream = require("stream").PassThrough();
        readStream.end(req.file.buffer);
        readStream.pipe(writeStream);

        writeStream.on("close", (file) =>{
            //delete the temporary bugget
            delete req.file.buffer
            gfs.unlink(req.file.id, (err) => {
                if (err) throw err;
                return res.json({file});
            
        })
    })
    }catch(err){
        return res.status(400).json({error: err})
    }
    
    
})

module.exports = router;



