import axios from "axios";
import { useEffect, useState } from "react";

const CommentList = ({id}) => {
    const [comments, setComments] = useState([]);
    
    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${id}/comments`);
        setComments(res.data)
    }

    useEffect(()=> {
        fetchComments()
    },[])
    
    const renderedComments = comments.map((comment)=> {
        return <li key={comment.id} > {comment.content} </li>
    })

    return <ul>
        {renderedComments}
    </ul>
}

export default CommentList;