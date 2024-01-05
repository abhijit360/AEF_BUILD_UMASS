// const mongo = require("mongodb");
// const {MongoClient} = mongo

// const connectionString = process.env.DB_CONNECTION_STRING || "";

// const client = new MongoClient(connectionString);

// var db;
// const GetConnection = async () =>{
//   try {
//     conn = await client.connect();
//     db =  conn.db("test");
//   } catch(e) {
//     console.error(e);
//   }
// }

// const getDB = () =>{
//   return db;
// }

// modules.export = db;

const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () =>{
  try{
    const conn = await mongoose.connect(process.env.DB_CONNECTION_STRING,
      {useNewUrlParser: true,
      useUnifiedTopology: true})
    console.log(`mongoDB connected : ${conn.connection.host}`);
    // console.log("data",process.env.S3_BUCKET, process.env.S3_REGION, process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)
  } catch(error){
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB