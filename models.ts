import { Schema, model, connect, Types } from "mongoose";
require('dotenv').config();
require("mongoose")

interface Admin {
    // set up admin to edit the website. Use google auth for this
    name: string;
    email: string;
    password: string;
}

const AdminSchema = new Schema<Admin>({
    name: {type: String, required: true},
    email:{type: String, unique: true, required: true},
    password: {type: String, required: true}
});

const Admin = model<Admin>("Admin", AdminSchema);

interface post {
    id: string; // uuid 
    title: string;
    content: string;
    author?: string;
    date: string;
    image_url?: string;
}
 
const postSchema = new Schema<post>({
    id: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String},
    date: { type: String , required: true},
    image_url: { type: String }
})

const Post = model<post>("Post", postSchema);

interface grant {
    title: string;
    grantee: string;
    amount: number | string;
    schools: Types.Array<String>;
    description: string;
}

const grantSchema = new Schema({
    title: { type: String, required: true },
    grantee: { type: String, required: true},
    amount: { type: Schema.Types.Mixed },
    schools: [{ type: String, required: true }],
    description: { type: String }
  });

const Grant = model<grant>("Grant", grantSchema);

interface sponsors {
    name: string;
    amount?: number;
    logo?: string; // url to image of logo
    date_from: string | number;
    date_to: string | number;

}

const sponsorSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number },
    logo: { type: String },
    date_from: { type: Schema.Types.Mixed },
    date_to: { type: Schema.Types.Mixed }
  });
  
const Sponsors = model<sponsors>("Sponsor",sponsorSchema);

interface executive_board {
    president: String;
    vice_president: string;
    treasurer: string;
    directors: Types.Array<String>;
}

const executiveBoardSchema = new Schema({
    president: { type: String, required: true  },
    vice_president: { type: String, required: true  },
    treasurer: { type: String, required: true  },
    directors: [{ type: String, required: true  }]
  });

const Executives = model<executive_board>("Executives", executiveBoardSchema)

const adminCredentials:Admin = {
    name: "AEF_admmin",
    email: "admin@example.com",
    password: "admin"
}

const dummyPostOne:post = {
    id: "1",// uuid 
    title: "This is a dummy title (no Author, No image)",
    content: "This is dummy content. Test to check my models in mongoDB",
    // author?: string;
    date: "24th Dec 2023"
    // image_url?: string;
}
const dummyPosttwo:post= {
    id: "2",// uuid 
    title: "This is a dummy title (No image)",
    content: "This is dummy content. Test to check my models in mongoDB",
    author: "John Doe",
    date: "24th Dec 2023",
    // image_url?: string;
}
const dummyPostthree:post= {
    id: "3",// uuid 
    title: "This is a dummy title",
    content: "This is dummy content. Test to check my models in mongoDB",
    author: "John Doe",
    date: "24th Dec 2023",
    image_url: "https://picsum.photos/536/354"
}


async function run(){
    await connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tnvjw71.mongodb.net/`)
    
    const adminInstance = new Admin(adminCredentials);
    try{
        await adminInstance.save();
        console.log("admin saved successfully")
    } catch (error) {
        console.error("Error saving Admin:", error);
    }   


    const postInstanceOne = new Post(dummyPostOne);
    try{
        await postInstanceOne.save();
        console.log("admin saved successfully")
    } catch (error) {
        console.error("Error saving Admin:", error)
    }
    
    const postInstanceTwo = new Post(dummyPostOne);
    try{
        await postInstanceOne.save();
        console.log("admin saved successfully")
    } catch (error) {
        console.error("Error saving Admin:", error)
    }
    
    const postInstanceThree = new Post(dummyPostOne);
    try{
        await postInstanceOne.save();
        console.log("admin saved successfully")
    } catch (error) {
        console.error("Error saving Admin:", error)
    }

}
