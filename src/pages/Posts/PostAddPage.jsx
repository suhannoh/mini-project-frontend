import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import axios from 'axios';
import { API_BASE } from '../../config/env';
import AuthStore from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';

export default function PostAddPage() {
  const navigate = useNavigate();
  const {user} = AuthStore();
  const [title , setTitle] = useState(""); // 제목
  const [category , setCategory] = useState(""); //카테고리
  const [author , setAuthor] = useState("author"); // 이름표시
  const [content , setContent] = useState(""); // 내용

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      userId : user.id,
      title ,
      content,
      category,
      author : author === "author" ? user.name : "익명",
    };
    try {
      await axios.post(`${API_BASE}/posts`, data);
      alert("성공적으로 글 작성이 완료되었습니다");
      navigate(-1);
    } catch (e) {
        const status = e.response?.status;
        const code = e.response?.data?.code;
        const message = e.response?.data?.msg;
        console.log(status, code, message);
        alert(message);

    }
  }

  return (
    <div>
        <Layout >
            <div className='post-add-page'> 
              <form onSubmit={handleSubmit}>
              <div className='post-add-left'>
                <h1>Post Setting</h1>
                <h3>제목</h3>
                  <input style={{border : title.trim() !== "" ? "" : "1px solid #EF4444"}}
                         onChange={(e) => setTitle(e.target.value)} type="text" 
                         placeholder='제목을 입력해주세요 '/>
                <h3> 카테고리 </h3>
                <select value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        name="category" id="category"
                        style={{border : category.trim() !== "" ? "" : "1px solid #EF4444"}}> 
                  <option value="">선택하세요</option>
                  <option value="자유게시판">자유게시판</option>
                  <option value="질문">질문</option>
                  <option value="개발정보">개발정보</option>
                </select>
                <h3>작성자 설정</h3>
                <div className='post-add-author' >
                  <label><input type="radio" name='authorType' 
                                value="author"  checked={author === "author"} 
                                onChange={(e) => setAuthor(e.target.value)}/>닉네임</label>
                  <label><input type="radio" name='authorType' 
                                value="anon"  checked={author === "anon"}
                                onChange={(e) => setAuthor(e.target.value)} />익명</label>
                </div>
              </div>
              <div className='post-add-right'>
                <textarea placeholder='내용을 입력하세요 (최대 500자)' value={content} 
                          onChange={(e) => setContent(e.target.value)}
                          maxLength={500}></textarea>
                <div className='post-submit-btn'>
                  <button type='submit' disabled={!title.trim() || !category.trim() || !content.trim()}>작성</button>
                </div>
              </div>
              </form>
            </div>
        </Layout>
    </div>
  )
}
