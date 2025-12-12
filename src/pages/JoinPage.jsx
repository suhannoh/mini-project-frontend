import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/env';
import BackBtn from '../components/BackBtn';

export default function JoinPage() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [phone , setPhone ] = useState("");
const navigate = useNavigate();


const handleJoin = async (e) => {
  e.preventDefault();

  if(!email || !password || !name) {
    return alert("공백  은 입력할 수 없습니다");
  }
  if(password.length < 5) {
    return alert("비밀번호는 5자리 이상입니다");
  }

  try {
      const response = await axios.post(
        `${API_BASE}/user/join`,
        {
            email,
            password,
            name,
        }
      );

      console.log("✅ 회원가입 성공:", response.data);
      alert("회원가입 성공!");
      navigate("/") 
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      alert("회원가입 실패");
    } 
  };
  return (
    <div>
    <>      
            <BackBtn/>
            <form onSubmit={handleJoin} className='loginForm'>
            <div className='login-form-left'>
              <h1> 회원가입 </h1>
              <br/>
              <p>서비스 이용을 위해 계정을 생성해주세요. </p>
              <br />
              <p>⚠️ 이 웹 사이트는 학습용입니다 <br/><span className='red-text'> 실제 개인정보를 이용하지 마세요 </span></p>
            </div>
            <div className='login-form-right'>
                <div className='login-input'>
                    <p><span className='red-text'>*</span> Email </p>
                    <input type="email" placeholder='이메일 (필수)' 
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className='login-input'>
                    <p><span className='red-text'>*</span> Password </p>
                    <input type="password" placeholder='비밀번호 (필수)' 
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='login-input'>
                    <p><span className='red-text'>*</span> Name </p>
                    <input type="text" placeholder='이름 (필수)' 
                    value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                 <div className='login-input'>
                    <p> Phone </p>
                    <input type="text" placeholder='전화번호 (선택)' 
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className='join-footer'>
                <button type='submit' id='join-btn'> 전송 </button>
                </div>
            </div>
            </form>
            </> 
    </div>
  )
}
