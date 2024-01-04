"use client"
import MarkdownEditor from "../../components/MarkdownEditor";
import axios from "axios";
import {Formik, useFormik} from "formik";


const re = new RegExp('^\\w*(?:,\\w*)*$');

const validate = values => {
    const errors = {};
    if(values.title == ""){
        errors.title = "*Required";
    }

    if(values.grantee ==""){
        errors.author = "*Required"
    }
    
    if(values.amount == ""){
        errors.content = "*Required"
    }

    if(values.schools == ""){
        errors.schools = "*Required"
    }
    if(!re.test(values.schools)){
        errors.schools = "*values must be comma separated with no spaces."
    }

    if(values.description == ""){
        errors.description == "*Required"
    }

    if(!values.date){
        errors.date = "*Required"
    }
    return errors;
}

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
            title:"", grantee:"", amount:"0.00", schools:"", description:"", date:getDate()
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
                <label for="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    />
                {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}

                <label for="author">Grantee</label>
                <input
                    id="author"
                    name="author"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.grantee}
                    />
                {formik.touched.grantee && formik.errors.grantee ? <div>{formik.errors.grantee}</div> : null}
                

                <label for="date">Date</label>
                <input
                    id="date"
                    name="data"
                    type="date"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.date}
                    />
                {formik.touched.date && formik.errors.date ? <div>{formik.errors.date}</div> : null}

                
                <label for="amount">amount</label>
                <input
                    id="amount"
                    name="amount"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    />
                {formik.touched.amount && formik.errors.amount ? <div>{formik.errors.amount}</div> : null}
                
                <label for="schools">Enter schools</label>
                <input
                    id="schools"
                    name="schools"
                    type="text"
                    placeholder="Enter comma separated values with no space in between. e.g. SchoolA,SchoolB"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.schools}
                    />
                {formik.touched.schools && formik.errors.schools ? <div>{formik.errors.schools}</div> : null}
                
                <label for="description">Enter description:</label>
                <input
                    id="description"
                    name="description"
                    type="description"
                    placeholder="Enter a description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    />
                {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}


                <button type="submit">Submit</button>
            </form>
        </div>
    )
}