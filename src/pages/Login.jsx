import axios from 'axios';
import React, { useState } from 'react'
import AuthStore from '../store/AuthStore';

export default function Login() {

    const [email , setEmail]= useState("");
    const [password , setPassword] = useState("");
    const login = AuthStore((state) => state.login);

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:8080/user/login",
                {
                    email,
                    password,
                }
            );
            console.log("✅ 로그인 성공:", res.data);
            login(res.data);
            console.log(AuthStore.getState().user);
            alert("로그인 성공!");
        } catch (e) {
            console.log(e);
            alert("로그인 실패");
        }

        console.log(AuthStore.getState().isLogin ? "로그인 성공" : "로그인 실패");
    }


  return (
    <div>
        <h2> Login </h2>
        <form onSubmit={handleLogin}>
            <div>
                <input type="email" placeholder='이메일' 
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input type="password" placeholder='비밀번호' 
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='submit'>Login !</button>
        </form>
    </div>
  )
}
