import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/auth';
import AuthStore from '../store/AuthStore';

export default function Post({id, idx , view , list}) {
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const {user} = AuthStore();
 

  useEffect(() => {
     const run = async () => {
      try {
        const resc = await api.get(`/post/${id}/comment`);
        setCommentCount(resc.data.length);
        const resl = await api.post(`/post/like/read`, {
          postId: id,
          userId : user.id,
        });
        setLikeCount(resl.data.likeCount);
      } catch {
        setCommentCount(0);
      }
    };
    run();
  }, [id, user.id]);
  return (
        <div className={view === "list" ? 'post' : "post-card"} onClick={() => navigate(`/posts/${id}`)} >
            {view === "list" &&
            <h2 className='post-id'> {idx} </h2>}
            <h2 className='post-title'> {list.title} </h2>
            {view === 'card' && 
            <h2> {list.content} </h2>}
            <h3 className='post-like'> 💬 {commentCount} </h3>
            <h3 className='post-like'> ♥ {likeCount} </h3>
        </div>
  )
}
