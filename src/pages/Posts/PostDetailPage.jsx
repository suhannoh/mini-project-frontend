import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { API_BASE } from '../../config/env';
import AuthStore from '../../store/AuthStore';

export default function PostDetailPage() {
    const {id} = useParams();
    const [post , setPost] = useState(null);
    const [comments ,setComments] = useState([]);
    const {user} = AuthStore();

    const navigate = useNavigate();

    const fetchComments = async () => {
        const resc = await axios.get(`${API_BASE}/post/comment/${id}`);
        setComments(resc.data);
        console.log("댓글" , resc.data);
    };
    useEffect (() => {
        
    const getPostDetail = async () => {
        try {
            const res = await axios.get(`${API_BASE}/posts/${id}`);
            setPost(res.data);
            console.log(res.data)
            await fetchComments();
        } catch (e) {
            const status = e.response?.status;
            const code = e.response?.data?.code;
            const message = e.response?.data?.msg;
            console.log(status, code, message);
            alert(message);
            navigate("/posts");
        }} 
        getPostDetail();
    }, [id])

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
    const formatDateTimeDay = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const handleDeleteComment = () => {
        alert("준비중입니다")
    }

    const isMyPost = user && post.userId === user.id;

  return (
    <div>
        <Layout editBtn={isMyPost} post={post}
        textInput={true} postId={Number(id)} commentMethod={fetchComments}>
        <div className="post-detail">
            
            <div className='post-detail-header'> 
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
                {comments.map((comment) => {
                    return (
                    <div className='post-detail-comment' key={comment.id}>
                    <span> {comment.name}</span>
                    <p> {comment.comment}</p>  
                    <div className='post-detail-comment-createdAt'> 
                        {/* <button className='comment-delete-btn'>❌</button> */}
                       <span>{formatDateTimeDay(comment.createdAt)}</span> 
                    </div>
                    {/* { isMyPost && ( */}
                        <button 
                        className='comment-delete-btn'
                        onClick={handleDeleteComment}
                        aria-label="댓글 삭제"
                        >
                        ×
                        </button>
                    {/* )} */}
                </div>
                    )})}
            </div>
           
        </div>
        </Layout>
    </div>
  )
}
