import { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import AuthStore from '../../store/AuthStore';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';

export default function PostDetailPage() {
    // URL 파라미터에서 id 가져오기
    const {id} = useParams();
    // 게시글 상세 정보
    const [post , setPost] = useState(null);
    // 댓글 리스트 
    const [comments ,setComments] = useState([]);
    // 전역 상태 관리에서 사용자 정보 가져오기 
    const {user} = AuthStore();
    // 네비게이트
    const navigate = useNavigate();


    // 댓글 불러오기
    const fetchComments = async () => {
        const resc = await api.get(`/post/comment/${id}`);
        // 댓글 상태 업데이트
        setComments(resc.data);
    };


    useEffect (() => {
    // 게시글 상세 정보 불러오기
    const getPostDetail = async () => {
        try {
            const res = await api.get(`/posts/${id}`);
            // 상태 업데이트
            setPost(res.data);
            // 게시글 댓글 불러오기
            await fetchComments();
        } catch (e) {
            logError(e);
            // 에러 시 게시글 목록 페이지로 이동
            navigate("/posts");
        }} 
        // 함수 호출
        getPostDetail();
    }, [id])

    // 로딩 중일 때
    if(!post) {
        return (
            <Layout>
                <p>Loading,,,,</p>
            </Layout>
        )
    }

    // 날짜 및 시간 포맷 함수
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

    // 댓글 삭제 함수 (준비중)
    const handleDeleteComment = () => {
        alert("준비중입니다")
    }

    // 현재 사용자가 작성한 게시글인지 확인
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
                {/* 댓글 목록 */}
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
