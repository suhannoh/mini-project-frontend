import  { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import AuthStore from '../../store/AuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';

export default function PostAddPage() {
  // 이전 페이지에서 전달된 상태
  const {state} = useLocation();
  // 페이지 이동
  const navigate = useNavigate();
  // 사용자 정보
  const {user} = AuthStore();

  // 입력 데이터
  const [title , setTitle] = useState(""); // 제목
  const [category , setCategory] = useState(""); //카테고리
  const [author , setAuthor] = useState("author"); // 이름표시
  const [content , setContent] = useState(""); // 내용

  // 더블클릭 방지
  const [isSubmit, setIsSubmit] = useState(false);              
  

  // 수정 모드일 때 기존 데이터 불러오기
  useEffect(() => {
      if (!state) return;
      setTitle(state.title ?? "");
      setContent(state.content ?? "");
      setCategory(state.category ?? "");
      setAuthor(state.author === "익명" ? "anon" : "author");
  },[state])

  // 글 작성 및 수정 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmit(true);
    // 서버로 전송할 데이터 구성
    const data = {
      userId : user.id,
      title ,
      content,
      category,
      author : author === "author" ? user.name : "익명",
      postId : state && state.id,
    };

    try {
      // 작성 또는 수정 API 호출
      if(!state) {
        await api.post(`/post`, data);
      } else {
        await api.put(`/post`, data);
      }
      alert(`성공적으로 글 ${!state ? "작성" : "수정"}이 완료되었습니다`);
      navigate(-1);
    } catch (e) {
        logError(e);
    } finally {
      setIsSubmit(false);
    }
  }


  return (
    <div>
        <Layout layoutType='post' >
            <div className='post-add-page'> 
              <form onSubmit={handleSubmit}>
              <div className='post-add-left'>
                <h1>Post Setting</h1>
                <h3>제목</h3>
                  <input value={title}
                        style={{border : title.trim() !== "" ? "" : "1px solid #EF4444"}}
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
                  <button type='submit' 
                    disabled={!title.trim() || !category.trim() || !content.trim() || isSubmit}>
                    {state ? "수정" : "작성"}
                  </button>
                </div>
              </div>
              </form>
            </div>
        </Layout>
    </div>
  )
}
