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
  return (
    <div>
        <Layout>
        <div className="post-detail">
            <h1 style={{
                color: "red"
            }}> TEST POST DETAIL</h1>
            <h1>postid : {post.id}</h1>
            <h1>post userId : {post.userId}</h1>
            <h1>title : {post.title}</h1>
            <h1>content : {post.content}</h1>
            <h1>category : {post.category}</h1>
            <h1>author : {post.author}</h1>
            <h1>created_at : {post.createdAt}</h1>
            <h1>updated_at : {post.updatedAt}</h1>
        </div>
        </Layout>
    </div>
  )
}
