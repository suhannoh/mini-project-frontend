import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_BASE } from '../../config/env';

export default function PostDetailPage() {
    const {id} = useParams();
    const [post , setPost] = useState(null);
    useEffect (() => {
        
    const getPostDetail = async () => {
        try {
            const res = await axios.get(`${API_BASE}/posts/${id}`);
            setPost(res.data);
        } catch (e) {
            console.log(e);
            alert("게시글을 불러오지 못 했습니다 ");
        }} 
        getPostDetail();
    }, [id])
    console.log("포스트 : " , post)

    if(!post) {
        return (
            <Layout>
                <p>Loading,,,,</p>
            </Layout>
        )
    }

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

  return (
    <div>
        <Layout textInput={true}>
        <div className="post-detail">
            
            <div className='post-detail-header'> 
              {/* <h1> postid : {post.id}</h1> */}
              <div className='post-detail-header-top'>
            	<h1> {post.title}</h1>
              </div>
              <div className='post-detail-header-btm'>
                <p>{post.author} / {post.category}</p>
				<p>{formatDateTime(post.updatedAt)} </p>
              </div>
            </div>
            <div className='post-detail-main'>
				<p className='post-detail-font-size'>
                    {post.content}</p>
            </div>
            <div className='post-detail-footer'>
                <div className='post-detail-comment'>
                    <span> 사용자 1</span>
                    <p>댓글 예제 1</p>  
                    <div className='post-detail-comment-createdAt'> 
                       <span>createdAt</span> 
                    </div>
                </div>
                <div className='post-detail-comment'>
                    <span> 사용자 2</span>
                    <p>댓글 예제 222222222222</p>  
                    <div className='post-detail-comment-createdAt'> 
                       <span>createdAt</span> 
                    </div>
                </div>
                <div className='post-detail-comment'>
                    <span> 사용자 3</span>
                    <p>댓글 예제 333 mmmmmmmmmmmmmmmmmmmmmmmmmmmm</p>  
                    <div className='post-detail-comment-createdAt'> 
                       <span>createdAt</span> 
                    </div>
                </div>
                <div className='post-detail-comment'>
                    <span> 사용자 4</span>
                    <p>댓글 예제 4 LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
                                LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL</p> 
                    <div className='post-detail-comment-createdAt'> 
                       <span>createdAt</span> 
                    </div> 
                </div>
                <div className='post-detail-comment'>
                    <span> 사용자 5</span>
                    <p>댓글 예제 5</p>  
                    <div className='post-detail-comment-createdAt'> 
                       <span>createdAt</span> 
                    </div>
                </div>
            </div>
           
        </div>
        </Layout>
    </div>
  )
}
