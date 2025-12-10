import React, { useState } from 'react'
import axios from 'axios';

export default function Join() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");


const handleJoin = async (e) => {
  e.preventDefault();

  try {
      const response = await axios.post(
        "http://localhost:8080/user/join",
        {
            email,
            password,
            name,
        }
      );

      console.log("✅ 회원가입 성공:", response.data);
      alert("회원가입 성공!");

    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      alert("회원가입 실패");
    }
  };
  return (
    <div>
    <h1>Axios + Spring 테스트</h1>
      <form onSubmit={handleJoin}>
        <div>
          <input type="email" placeholder='이메일'
          value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
         <div>
          <input type="password" placeholder='비밀번호'
          value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
         <div>
          <input type="text" placeholder='이름'
          value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <button type='submit'>  회원가입 </button>
      </form> 
    </div>
  )
}
