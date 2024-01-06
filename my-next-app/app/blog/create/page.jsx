"use client"
import axios from "axios";
import {Formik, useFormik} from "formik";
import { useState } from "react";
import ReactMarkdown  from "react-markdown"

const validate = values => {
    const errors = {};
    if(!values.title){
        errors.title = "*Required";
    }

    if(!values.author){
        errors.author = "*Required"
    }

    if(!values.content){
        errors.content = "Required"
    }

    if(!values.date){
        errors.date = "Required"
    }
    return errors;
}

const getData = async () =>{
    try{
        console.log("connecting")
        const res = await axios.get(`http://localhost:5000/api/post/${params.id}`);
        const data = await res.data
        // console.log("data returned")
        console.log("post data:",data);
        setPostData(data[0]) // data returned is a list of one element
    }catch(error){
        console.error("error:", error)
    }
}
getData();

function getDate() {
    const today = new Date();
    const today_day = today.getUTCDate();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();
    return `${today_year}-${today_month + 1}-${today_day -1}`;
  }

export default function CreatePostLive(){

    const [imageUrls, setImageUrls] = useState({
        imageOne: null,
        imageTwo: null,
        imageThree: null,
    });
    
    const getAddress = (fieldName) =>{
        const imageHash = imageUrls[fieldName]
        return `/api/image/${imageHash}`
    }

    const deleteImageHandler = async (fieldName, event) =>{
        const input = document.getElementById(fieldName);
        input.value = null;
        const imageHash = imageUrls[fieldName] 
        const response = await axios.delete(`http://localhost:5000/api/image/${imageHash}}`)
        console.log(response)
        setImageUrls({...imageUrls, [fieldName]: null});
        formik.setFieldValue(fieldName, null);
    }


    const handleImageUpload = async (fieldName, event) =>{
        const selectedFile = event.currentTarget.files[0];
        if (selectedFile){
            var formData = new FormData();
            formData.append("image", selectedFile);
            const response = await axios.post("http://localhost:5000/api/image/", formData,{
                headers:{
                    "content-Type": 'multipart/form-data'
                }
            })
            const imageHash = response.data.imageID
            setImageUrls({...imageUrls, [fieldName]: imageHash});
            formik.setFieldValue(fieldName, selectedFile);
        }
    }
    const formik = useFormik({
        initialValues:{
            title:"", author:"", date:"", content:"", imageOne:null, imageTwo:null, imageThree:null
        },
        validate,
        onSubmit: async (values) =>{
            console.log("submitting form lol")
        }
});

    return(
        <div>
        <div >
            <h1>Create Your Post</h1>
            <form style={{display:'flex', flexDirection:"column", gap:"10px"}} onSubmit={formik.handleSubmit}>
                <label for="title">Title</label>
                <input
                    id="email"
                    name="title"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    />
                {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}

                <label for="author">Author:</label>
                <input
                    id="author"
                    name="author"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.author}
                    />
                {formik.touched.author && formik.errors.author ? <div >{formik.errors.author}</div> : null}

                <label for="date">Date:</label>
                <input
                    id="date"
                    name="data"
                    type="date"
                    onBlur={formik.handleBlur}
                    onChange={(event)=>{
                        formik.setFieldValue("date", event.target.value)
                    }}
                    value={formik.values.date}
                    />
                {formik.touched.date && formik.errors.date ? <div>{formik.errors.date}</div> : null}

                
                <label for="content">Content:</label>
                <textarea
                    id="content"
                    name="content"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.content}
                    />
                {formik.touched.content && formik.errors.content ? <div>{formik.errors.content}</div> : null}

                <label for="imageOne">Upload 1st Image</label>
                <input
                    id="imageOne"
                    name="imageOne"
                    type="file"
                    accept="image/*"
                    onChange={
                        (event) => handleImageUpload("imageOne",event)
                    }
                    />
                
                {formik.values["imageOne"] && formik.values["imageOne"] instanceof File && 
                (<div>
                    <img 
                        style={{width:"75px", height:"75px"}} 
                        src={URL.createObjectURL(formik.values["imageOne"])} 
                        alt="Image 1" 
                    />
                    <div>
                        <button onClick={(e) =>{
                            navigator.clipboard.writeText(getAddress("imageOne"))
                        }}>Copy</button>
                        <button onClick={() => deleteImageHandler("imageOne")}>Delete</button>
                    </div>
                </div>)
                }

                <label for="imageTwo">Upload 2nd Image</label>
                <input
                    id="imageTwo"
                    name="imageTwo"
                    type="file"
                    accept="image/*"
                    onChange={
                        (event) => handleImageUpload("imageTwo",event)
                    }
                    />
                
                {formik.values["imageTwo"] && formik.values["imageTwo"] instanceof File && 
               (<div>
                <img 
                    style={{width:"75px", height:"75px"}} 
                    src={URL.createObjectURL(formik.values["imageTwo"])} 
                    alt="Image 2 " 
                />
                <div>
                    <button onClick={(e) =>{
                        navigator.clipboard.writeText(getAddress("imageTwo"))
                    }}>Copy</button>
                    <button onClick={() => deleteImageHandler("imageTwo")}>Delete</button>
                </div>
            </div>)
                }

                <label for="imageThree">Upload 3rd Image</label>
                <input
                    id="imageThree"
                    name="imageThree"
                    type="file"
                    accept="image/*"
                    onChange={
                        (event) => handleImageUpload("imageThree",event)
                    }
                    />
                
                {formik.values["imageThree"] && formik.values["imageThree"] instanceof File && 
                (<div>
                    <img 
                        style={{width:"75px", height:"75px"}} 
                        src={URL.createObjectURL(formik.values["imageThree"])} 
                        alt="Image 3" 
                    />
                    <div>
                        <button onClick={(e) =>{
                            navigator.clipboard.writeText(getAddress("imageThree"))
                        }}>Copy</button>
                        <button onClick={() => deleteImageHandler("imageThree")}>Delete</button>
                    </div>
                </div>)
                }



        
                <button type="submit">Submit</button>
            </form>

        </div>
        <div style={{display: "flex", flexDirection:'column', border: "solid black 0.5px", padding:"1rem", marginTop:"1rem"}}>
            <p>New Post:</p>
            {formik.values.title && <h1>{formik.values.title}</h1>}
            {formik.values.author && <p>{formik.values.author}</p>}
            {formik.values.date && <p>{formik.values.date}</p>}
            {formik.values.content &&
                <ReactMarkdown children={formik.values.content}></ReactMarkdown>
            }

        </div>
        </div>
    )
}