"use client";
import {useState} from "react";
import Link  from "next/link";



function Post({id, title ,date  ,author ,content}){    
    return(
        <div>
            <div>
                <Link href={`/blog`}> Go Back </Link>
                <h1>Title:{title}</h1>
                <span>
                    <h3>Date:{date}</h3>
                    <h3>Author{author}</h3>
                </span>
            </div>
            <div>
                <p>content:{content}</p>
            </div>
        </div>
    )
}



export default Post;