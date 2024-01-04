const mongoose = require("mongoose");
const mongoDB = require("mongodb");
require("dotenv").config();
const {Schema, connect} = mongoose


const postSchema = new Schema({
    title: String,
    subtitle: String,
    synopsis: String,
    author: String,
    authorImgID: String,
    content: String,
    contentImgID: String,
    tags: [String],
    images: [String],
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now }
    })

const AdminSchema = new Schema({
    name: {type: String, required: true},
    email:{type: String, unique: true, required: true},
    password: {type: String, required: true}
});

const grantSchema = new Schema({
    title: { type: String, required: true },
    grantee: { type: String, required: true},
    amount: { type: String },
    schools: [{ type: String, required: true }],
    description: { type: String },
    date: { type: Date }
  });

  
const sponsorSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number },
    logo: { type: String },
    link: { type: String },
    date_from: { type: Date },
    date_to: { type: Date }
});

const executiveBoardSchema = new Schema({
    president: { type: String, required: true  },
    vice_president: { type: String, required: true  },
    treasurer: { type: String, required: true  },
    directors: [{ type: String, required: true  }]
  });

  
const adminCredentials = {
    name: "AEF_admmin",
    email: "admin@example.com",
    password: "admin"
}

const dummyPostOne = {
    title: "2022 Family Mini-Gold Fundraiser - A huge Success!",
    synopsis: "Raised a total of $12,494 at our 3rd annual Family Mini-Golf fundraiser.",
    author: "John Doe",
    // authorImgID: String,
    content: String,
    contentImgID: String,
    tags: [String],
    images: [String],
    created: { type: Date, default: Date.now },
    edited: { type: Date, default: Date.now }
}
const dummyPosttwo = {
    id: "2",// uuid 
    title: "This is a dummy title (No image)",
    content: "This is dummy content. Test to check my models in mongoDB",
    author: "John Doe",
    date: "24th Dec 2023",
    // image_url?: string;
}
const dummyPostthree = {
    id: "3",// uuid 
    title: "This is a dummy title",
    content: "This is dummy content. Test to check my models in mongoDB",
    author: "John Doe",
    date: "24th Dec 2023",
    image_url: "https://picsum.photos/536/354"
}

const GrantOne = {
    title: "Bridge To Resilient Youth In Transition (BRYT) Mindful Gardening Project" ,
    grantee: "Karen Peters",
    amount:"3,677",
    schools: ["Crocker Farm", "Fort River", "Pelham Elementary", "Wildwood"],
    description: 
    "Lincoln Smith, Heather Samson, and Ariel Templeton will work on instrument repairs,\
     replacements and professional development for teachers to revitalize Amherst's elementary\
     instrumental education. For more than forty years, ARPS has offered the opportunity to learn\
     band and orchestral instruments through the use of free or low-cost instruments in our elementary \
     schools. The music program is unique to Amherst as the only district wide, elementary program of its \
     kind in Western Massachusetts. Protecting The Investment will target 4th through 6th grade students in \
     Fort River, Crocker Farm, Wildwood and Pelham schools. The repairs, replacement, and better storage of \
     instruments will increase student participation and retention in instrumental programs by ensuring that\
      all students receive instruments in proper working order."
}

const sponsorOne = {
    name:"Amherst Area Chamber of Commerce",
    // amount: { type: Number },
    logo:"https://growthzonesitesprod.azureedge.net/wp-content/uploads/sites/1693/2020/07/Chamber-Logo-NEW-1024x623.png",
    // date_from: ,
    // date_to:
}

const EB = {
    
    president: "Shawn Fortin",
    vice_president: "Kerry Crosby",
    treasurer: "Mila Sherman",
    directors: ["Marzena Burnham", "Elizabeth Laraia", "Anya Mkrtchyan", "Evan Naismith", "John Page"]
 
}
run()
async function run(){
    // dummy data to populate MongoDB to understand how the data looks like
        const Admin = mongoose.model("Admin", AdminSchema);
        const Post = mongoose.model("Post", postSchema);
        const Grant = mongoose.model("Grant", grantSchema);
        const Sponsor = mongoose.model("Sponsor", sponsorSchema);
        const E_board = mongoose.model("E_board", executiveBoardSchema);
    try{
        // const DB_connection = await connect(process.env.DB_CONNECTION_STRING)
        
        // const adminInstance = new Admin(adminCredentials);
        // await adminInstance.save();
        // console.log("admin saved successfully")
    
        // const postInstanceOne = new Post(dummyPostOne);
        // await postInstanceOne.save();
        // console.log("Post one saved successfully")
       
        // const postInstanceTwo = new Post(dummyPosttwo);
        // await postInstanceTwo.save();
        // console.log("Post Two saved successfully")

        // const postInstanceThree = new Post(dummyPostthree);
        // await postInstanceThree.save();
        // console.log("Post three saved successfully")

        // const grantOneInstance = new Grant(GrantOne);
        // await grantOneInstance.save();
        // console.log("Grant one saved successfully")

        // const SponsorOneInstance = new Sponsor(sponsorOne);
        // await SponsorOneInstance.save();
        // console.log("Sponsor One saved Successfully")
        
        // const EBInstance = new E_board(EB);
        // await EBInstance.save();
        // console.log("EB saved successfully!")
        
        
        // const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName:"Images"})
        // console.log("Bucket made")

    }catch(error){
        console.error("error:", error)
    } 
}