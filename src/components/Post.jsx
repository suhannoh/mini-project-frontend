import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Post({id, idx , view , list}) {
  const like = 0;
  const navigate = useNavigate();
  return (
        <div className={view === "list" ? 'post' : "post-card"} onClick={() => navigate(`/posts/${id}`)} >
            {view === "list" &&
            <h2 className='post-id'> {idx} </h2>}
            <h2 className='post-title'> {list.title} </h2>
            {view === 'card' && 
            <h2> {list.content} </h2>}
            <h2 className='post-like'> ♥ {like} </h2>
        </div>
  )
}
