import axios from "axios";
export async function GET(req:Request, { params }: { params: { hash: string } }) {
    return await fetch(`http://localhost:5000/api/image/${params.hash}`)
}