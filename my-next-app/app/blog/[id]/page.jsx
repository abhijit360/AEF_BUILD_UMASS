"use client"
import axios from "axios"
import {useEffect, useState} from "react"
import Post from "../../components/post"

export default function postByID({params}){
    const [postData, setPostData] = useState(null);
    useEffect(() =>{
        const getData = async () =>{
            try{
                console.log("connecting")
                const res = await axios.get(`http://localhost:5000/api/post/${params.id}`);
                const data = await res.data
                // console.log("data returned")
                console.log(data);
                setPostData(data)
            }catch(error){
                console.error("error:", error)
            }
        }
        getData();
    },[])

    return(
        <div>
            {!postData && <p>loading</p>}
            {postData && <Post key={postData.id} id={postData.id} title={postData.title} date={postData.date} author={postData.author} content={postData.content} />}
        </div>
    )
}