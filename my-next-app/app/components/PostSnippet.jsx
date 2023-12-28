"use client";
import {useState} from "react";
import Link  from "next/link";



function PostSnippet({id, title ,date  ,author ,content}){    
    return(
        <div>
            <div>
                <h1>Title:{title}</h1>
                <span>
                    <h3>Date:{date}</h3>
                    <h3>Author{author}</h3>
                </span>
            </div>
            <div>
                <p>content:{content.substring(0,10)}...</p>
                <Link href={`/blog/${id}`}> Read more </Link>
            </div>
        </div>
    )
}

// BlogPost.propTypes = {
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     date: PropTypes.string,
//     author: PropTypes.string,
//     content: PropTypes.string.isRequired
// };

export default PostSnippet;