import { useNavigate, useParams } from 'react-router-dom';
import AuthStore from '../../store/AuthStore';
import { api } from '../../api/auth';

export default function PostDeleteBtn() {

  const {id} = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const {user} = AuthStore();

  const deleteHandler = async () => {
    const ok = confirm("정말 게시글을 삭제하시겠습니까 ?");
    if(ok) {
      try {
        await api.delete(`/post/${postId}` , { data : {userId : user.id} });
        alert("삭제 완료되었습니다.")
        navigate("/posts");
      } catch (e) {
          const status = e.response?.status;
          const code = e.response?.data?.code;
          const message = e.response?.data?.msg;
          console.log(status, code, message); 
          alert(message);
      }
    }
  };

  return (
    <div>
      <button onClick={deleteHandler}>삭제</button>
    </div>
  )
}
