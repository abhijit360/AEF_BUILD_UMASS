"use client"
import axios from "axios"
import { useEffect, useState } from "react";
import PostSnippet from "../components/PostSnippet";

export default function post(){
    const [postdata, setPostData ] = useState(null);
   
    useEffect(() =>{
        const getData = async () =>{
            try{
                console.log("connecting")
                const res = await axios.get('http://localhost:5000/api/post/');
                const data = await res.data
                // console.log("data returned")
                // console.log(data);
                setPostData(data)
            }catch(error){
                console.error("error:", error)
            }
        }
        getData();
    },[])

    return(
    <main>
        <h1>These are all the posts</h1>
        <div>
            {!postdata && <p>Loading the data</p>}
            {postdata && postdata.map(
                (post)=> <PostSnippet key={post.id} id={post.id} title={post.title} date={post.date} author={post.author} content={post.content}/>)}
        </div>
        <img></img>
    </main>
    )
}

