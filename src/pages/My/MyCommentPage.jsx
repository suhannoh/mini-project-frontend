import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { logError } from '../../components/logError';
import { api } from '../../api/auth';
import AuthStore from '../../store/AuthStore';
import { formatDateTimeDay } from '../../components/date/dateTimeDay';
import { useNavigate } from 'react-router-dom';

export default function MyCommentPage() {
    const {user} = AuthStore();
    const [comments , setComments] = useState([]);
    const navigate = useNavigate();
    
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await api.get(`/post/my/comment` ,{
          params : {
            userId : user.id,
          }
        });
        // console.log(res.data);
        setComments(res.data);
      } catch (e) {
        logError(e);
      }
    }
    getComments();
  }, [])
    
  return (
    <div>
        <Layout layoutType="post">
            <div className="my__post-list">
                <table>
                    <thead>
                        <tr className='my-comment-head'>
                        <th>idx</th>
                        <th>postid</th>
                        <th>userid</th>
                        <th>comment</th>
                        <th>create</th>
                        </tr>
                    </thead>
                <tbody>
                {comments && comments.length > 0
                ? 
                comments.map((comment,idx) => 
                    <tr key={idx} onClick={() => navigate(`/posts/${comment.postId}`)} 
                        className={idx % 2 === 0 ? "user__info-table table-active" : "user__info-table-gray table-active"}>
                        <td>{idx + 1}</td>
                        <td>{comment.postId}</td>
                        <td>{comment.userId}</td>
                        <td className="comment-cell">{comment.comment}</td>
                        <td>{formatDateTimeDay(comment.createdAt)}</td>
                    </tr>
                )
                : <tr>
                    <td colSpan={5}>
                        <h2> 작성한 댓글이 없습니다</h2>
                    </td>
                </tr>}
                </tbody>
                </table>
            </div>
        </Layout>
    </div>
  )
}
