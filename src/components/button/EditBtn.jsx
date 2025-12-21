import { useNavigate } from 'react-router-dom'

export default function EditBtn({post}) {
    const navigate = useNavigate();
  return (
    <div>
        <button className="post-add-move-btn" 
                onClick={() => navigate("/posts/new" , { state : post})}> 수정 </button>
    </div>
  )
}
