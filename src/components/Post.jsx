import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/auth';

export default function Post({id, idx , view , list}) {
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0);

 

  useEffect(() => {
     const run = async () => {
      try {
        const resc = await api.get(`/post/${id}/comment`);
        setCommentCount(resc.data.length);
      } catch {
        setCommentCount(0);
      }
    };
    run();
  }, [])
  return (
        <div className={view === "list" ? 'post' : "post-card"} onClick={() => navigate(`/posts/${id}`)} >
            {view === "list" &&
            <h2 className='post-id'> {idx} </h2>}
            <h2 className='post-title'> {list.title} </h2>
            {view === 'card' && 
            <h2> {list.content} </h2>}
            <h2 className='post-like'> 💬 {commentCount} </h2>
        </div>
  )
}
