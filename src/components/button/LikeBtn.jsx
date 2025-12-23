import React, { useEffect, useState } from 'react'
import { api } from '../../api/auth'
import { logError } from '../logError';
import AuthStore from '../../store/AuthStore';

export default function LikeBtn({post}) {
    const {user} = AuthStore();
    const [liked , setLiked] = useState(false);
    const [likeCount , setLikeCount] = useState(0);

    // 좋아요 상태 초기화 (예: 사용자가 이미 좋아요를 눌렀는지 확인)
        const checkIfLiked = async () => {
            try {
                const res = await api.post(`/post/like/read` , {
                    postId: post.id,
                    userId : user.id,
                });
                setLikeCount(res.data.likeCount); 
                setLiked(res.data.liked);
                console.log("좋아요 상태 확인 :" , liked);
            }
            catch (e) {
                logError(e);
            }
        }


    useEffect(() => {
        const run = async () => {
            await checkIfLiked();
        }
        run();
    }, [post.id , user.id]);


    const handleLike = async () => {
        try {
            await api.post('/post/like' , {
                postId : post.id,
                userId : user.id
            })
            checkIfLiked();

        } catch (e) {
            logError(e);
        }
    }

  return (
    <div>
        <button className='like-btn' onClick={handleLike}> {liked ? '❤️' : '♡'} {likeCount}</button>
    </div>
  )
}
