"use client"
import axios from "axios";
import { useState } from "react";
export default async function getImage({params}) {
    [imageData, setImageData] = useState(null)
    const getImage = async () => {
        const response = await axios.get(`http://localhost:5000/api/image/${params.hash}`)
        setImageData(response.data)
    }
    getImage()
    // console.log(val.data)
    if(imageData) {return (val.data)}
}