"use client"
import MarkdownEditor from "../../components/MarkdownEditor";
import axios from "axios";
import {Formik, useFormik} from "formik";

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

    const formik = useFormik({
        initialValues:{
            title:"", author:"", date:getDate(), content:""
        },
        validate,
        onSubmit: async (values) =>{
            const res = await axios.post(`http://localhost:5000/api/post/`,
            values);
            const data = await res.data
        }
    });

    return(
        <div>
            <h1>Create Your Post</h1>
            <form onSubmit={formik.handleSubmit}>
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
                {formik.touched.author && formik.errors.author ? <div>{formik.errors.author}</div> : null}

                <label for="date">Date:</label>
                <input
                    id="date"
                    name="data"
                    type="date"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.date}
                    />
                {formik.touched.date && formik.errors.date ? <div>{formik.errors.date}</div> : null}

                
                <label for="content">Content:</label>
                <input
                    id="content"
                    name="content"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.content}
                    />
                {formik.touched.content && formik.errors.content ? <div>{formik.errors.content}</div> : null}

        
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}