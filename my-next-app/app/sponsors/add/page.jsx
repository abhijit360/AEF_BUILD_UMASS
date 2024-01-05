"use client"
import MarkdownEditor from "../../components/MarkdownEditor";
import axios from "axios";
import {Formik, useFormik} from "formik";
import {useState} from "react";




const validate = values => {
    const errors = {};
    // name:"", logo:"", link:"", amount:"", date_from:"", date_to:"", "logo-img":null
    if(values.name == ""){
        errors.title = "*Required";
    }

    if(values.logo ==""){
        errors.logo = "*Required"
    }

    if(values.link == ""){
        errors.link = "*Required"
    }

    if(values.amount == ""){
        errors.amount = "*Required"
    }

    if(values.date_from == ""){
        errors.date_from == "*Required"
    }

    if(!values.date_to == ""){
        errors.date_to = "*Required"
    }
    return errors;
}



export default function CreatePostLive(){
    const [S3ImageId, setS3ImageId] = useState("")
    
    const getAddress = () =>{
        return `api/images/${S3ImageId}`
    }

    const deleteImageHandler = async () =>{
        formik.values["logo-img"] = null; // reset this back to null. (client facing reference)
        const response = await axios.delete(`http://localhost:5000/api/image/${S3ImageId}`)        
    }

    const PostImage = async (imageFile) =>{
        try{
            var formData = new FormData();
            formData.append("image", imageFile)
            
            const response = await axios.post("http://localhost:5000/api/image/post", formData,{
                headers:{
                    "content-Type": 'multipart/form-data'
                }
            })
            console.log("response from submitting data", response)
            setS3ImageId(response.data.imageId);
            console.log("imageid",S3ImageId)
        }catch(error){
            console.error(error);
        }
    }

    

    const formik = useFormik({
        initialValues:{
            name:"", logo:"", link:"", amount:"", date_from:"", date_to:"", "logo-img":null
        },
        validate,
        onSubmit: async (values) =>{
           console.log("submitting")
        }
    });

    return(
        <div>
            <h1>Add a grant</h1>
            <form onSubmit={formik.handleSubmit}>
                <label for="name">name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

                <label for="logo">Link to Logo</label>
                <input
                    id="logo"
                    name="logo"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.grantee}
                    />
                {formik.touched.logo && formik.errors.logo ? <div>{formik.errors.logo}</div> : null}

                {formik.values.logo.length == 0 &&
                // Remove the upload image option if they provide a link.
                <>
                <label for="logo-img">Upload logo</label>
                <input
                    id="logo-img"
                    name="logo-img"
                    type="file"
                    accept="image/*"
                    onChange={
                        (event) => {
                            PostImage(event.currentTarget.files[0]); // post to aws data base directly
                            formik.setFieldValue("logo-img", event.currentTarget.files[0]);
                        }
                    }
                    />
                </>
                }
                {formik.values["logo-img"] && formik.values["logo-img"] instanceof File && 
                (<div>
                    <img src={URL.createObjectURL(formik.values["logo-img"])} alt="Uploaded Logo" />
                    <div>
                        <button onClick={(e) =>{
                            navigator.clipboard.writeText(getAddress())
                        }}>Copy</button>
                        <button onClick={deleteImageHandler}>Delete</button>
                    </div>
                </div>)
                }
                
                <label for="date_from">Date</label>
                <input
                    id="date_from"
                    name="date_from"
                    type="date"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.date_from}
                    />
                {formik.touched.date_from && formik.errors.date_from ? <div>{formik.errors.date_from}</div> : null}

                <label for="date_to">Date</label>
                <input
                    id="date_to"
                    name="date_to"
                    type="date"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.date_to}
                    />
                {formik.touched.date_to && formik.errors.date_to ? <div>{formik.errors.date_to}</div> : null}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}