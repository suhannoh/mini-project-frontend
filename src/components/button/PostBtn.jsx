import '../comp.css'
import { useNavigate } from 'react-router-dom'
import AuthStore from '../../store/AuthStore';

export default function PostBtn() {
  const navigate = useNavigate();
  return (
    <div>
        <button className="post-add-move-btn" onClick={() => navigate("/posts/new")}> 글쓰기 </button>
    </div>
  )
}
