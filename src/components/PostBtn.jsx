import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthStore from '../store/AuthStore';

export default function PostBtn() {
  const { theme } = AuthStore();
  const navigate = useNavigate();
  return (
    <div>
        <button style={{fontWeight:"bold"}} className={theme ? "" : "white"} onClick={() => navigate("/posts/new")}> 글쓰기 </button>
    </div>
  )
}
