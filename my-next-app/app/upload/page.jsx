"use client"
import { useState } from "react"
import axios from "axios"
export default function uploadImage(){
    const [file, setFile] = useState(null)
    const [fileError,setFileError] = useState("")
    
    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!file){
            alert("Select an image to submit")
            return;
        }

        const formData = new FormData();
        formData.append("photo", file);
        try{
            const response = await axios.post("http://localHost:5000/api/upload/image", formData, {
                headers:{
                    "Content-Type":'multipart/form-data',
                }
            })
            console.log(response)
        }catch(error){
            console.log("error",error);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit} encType="mulitpart/form-data">
                <input type="file" onChange={handleFileChange} />
                {}
                <button type="submit">upload</button>
            </form>
        </div>
    )
};
