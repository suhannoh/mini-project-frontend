import { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import AuthStore from '../../store/AuthStore';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';
import { formatDateTimeDay } from '../../components/date/dateTimeDay';
import { formatDateTime } from '../../components/date/dateTime';


export default function PostDetailPage() {
    // URL 파라미터에서 id 가져오기
    const {id} = useParams();
    // 게시글 상세 정보
    const [post , setPost] = useState(null);
    const [postLoding , setPostLoding] = useState(true);
    // 댓글 리스트 
    const [comments ,setComments] = useState([]);
    // 전역 상태 관리에서 사용자 정보 가져오기 
    const {user} = AuthStore();
    // 네비게이트
    const navigate = useNavigate();


    // 댓글 불러오기
    const fetchComments = async () => {
        const resc = await api.get(`/post/${id}/comment`);
        // 댓글 상태 업데이트
        setComments(resc.data);
    };


    useEffect (() => {
    // 게시글 상세 정보 불러오기
        const getPostDetail = async () => {

        setPostLoding(true);
        try {
            const res = await api.get(`/post/${id}`);
            // 상태 업데이트
            setPost(res.data);
            // 게시글 댓글 불러오기
            await fetchComments();
        } catch (e) {
            logError(e);
            // 에러 시 게시글 목록 페이지로 이동
            navigate("/posts");
        } finally {
            setPostLoding(false);
        }};

        getPostDetail();
    }, [id])

    // 현재 사용자가 작성한 게시글인지 확인
    const isMyPost = user && post?.userId === user.id
    // 로딩 중일 때
    // if(!post) {
    //     return (
    //         <Layout>
    //             <p>Loading,,,,</p>
    //         </Layout>
    //     )
    // }


    // 댓글 삭제 함수 (준비중)
    const handleDeleteComment = async (commentId) => {
        try {
            await api.delete(`/post/comment/${commentId}`);
            
        } catch (e) {
            logError(e);
        }
        // 댓글 다시 불러오기
        fetchComments();
    };

    


    const PostDetailSkeleton = () => (
    <div className="post-detail skeleton-wrap">
      <div className="post-detail-header">
        <div className="post-detail-header-top">
          <div className="sk sk-title" />
        </div>
        <div className="post-detail-header-btm">
          <div className="sk sk-meta" />
          <div className="sk sk-meta short" />
        </div>
      </div>

      <div className="post-detail-main">
        <div className="sk sk-line" />
        <div className="sk sk-line" />
        <div className="sk sk-line" />
        <div className="sk sk-line short" />
      </div>

      <div className="post-detail-footer">
        <div className="sk sk-comment" />
      </div>
    </div>
  )



  return (
    <div className="page-enter">
        <Layout editBtn={isMyPost} post={post} likeBtn={true}
        textInput={true} postId={Number(id)} commentMethod={fetchComments}>
        {
            postLoding ? 
                <PostDetailSkeleton /> : 
                !post ? <p>게시글을 찾을 수 없습니다</p> :
            (
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
                       <span>{formatDateTimeDay(comment.createdAt)}</span> 
                    </div>
                    { ( isMyPost || comment.userId === user?.id) && (
                        <button 
                        className='comment-delete-btn'
                        onClick={() => handleDeleteComment(comment.id)}
                        >
                        ×
                        </button>
                    )}
                </div>
                    )})}
            </div>  
        </div>
        )}
        </Layout>
    </div>
  )
}
