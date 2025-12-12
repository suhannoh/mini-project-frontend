import axios from 'axios';
import AuthStore from '../store/AuthStore';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import MainPage from './mainpage';
import { API_BASE } from '../config/env';

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = AuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_BASE}/user/login`,
                {
                    email,
                    password,
                }
            );
            login(res.data);
            alert("로그인에 성공하여 메인페이지로 이동합니다.");
            navigate("/main", {replace : true});
        } catch (e) {
            // 500 -> 데이터 오류 (서버에서 보내준 오류코드 )
            if(e.response?.status === 500) {
                alert("이메일과 비밀번호를 확인해주세요 ");
            } else {
                alert("예상치 못한 오류가 발생되어 로그인에 실패하였습니다 ")
            }
        } 
    }

    return (
        <div>   
            <form onSubmit={handleLogin} className='loginForm'>
                <div className='login-form-left'>
                    <h1> 안녕하세요 </h1>
                    <br />
                    <p>서비스 이용을 위해 로그인을 해주세요. </p>
                </div>
                <div className='login-form-right'>
                    <div className='login-input'>
                        <p> Email </p>
                        <input type="email" placeholder='이메일'
                            value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div className='login-input'>
                        <p> Password </p>
                        <input type="password" placeholder='비밀번호'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='login-footer'>
                        <button type='submit'>Login</button>
                        <ul className='login-find-menu'>
                            <li onClick={() => alert("api 준비중")}  >아이디 찾기</li>
                            <li onClick={() => alert("api 준비중")}  >비밀번호 찾기</li>
                            <li onClick={() => navigate("/join")} className='point-text'> 회원가입 </li>
                        </ul>
                        <br />
                    </div>
                </div>
            </form>
        </div>
    )
}
