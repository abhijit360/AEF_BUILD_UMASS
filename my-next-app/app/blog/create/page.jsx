import MarkdownEditor from "../../components/MarkdownEditor";
import axios from "axios";

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

export default function CreatePostLive(){
    return(<MarkdownEditor/>)
}