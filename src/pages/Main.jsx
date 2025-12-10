import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();
  return (
    <div>
        <div>
            <button onClick={() => navigate("/join")}> 회원가입 </button>
        </div>
        <div>
            <button onClick={() => navigate("/login")}> 로그인 </button>
        </div>
    </div>
  )
}
