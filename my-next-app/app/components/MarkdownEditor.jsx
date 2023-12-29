"use client"
import React, {useState} from 'react';
import ReactMarkdown  from "react-markdown"
import ImageUpload from "./ImageUpload"


export default function MarkdownEditor() {
    const [markdownInput, setMarkdownInput] = useState("")

    const createBlog = () =>{
        console.log("submitting")
    }
    return (
        <>
        <div style={{display: "flex", gap: "100px", flexdirection: "row"}}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", border: "0.5px solid black", padding: "1rem" }}>
                <div>
                    Markdown
                </div>
                <textarea 
                autoFocus
                value={markdownInput}
                onChange={(e) =>{
                    setMarkdownInput(e.target.value)
                }}
                ></textarea>
                {/* <label for="image-submission" >Upload Images</label>
                <input name="image-submission" type="file" multiple="true" accept="image/png, image/jpeg, .jpeg, .png" /> */}
                <ImageUpload />
                <button onClick={createBlog}>Submit</button>
            </div>
            <div>
                <div>Preview</div>
                <ReactMarkdown children={markdownInput}></ReactMarkdown>
            </div>
        </div>
        </>
    )
}