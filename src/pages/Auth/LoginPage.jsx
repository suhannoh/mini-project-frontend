import axios from 'axios';
import AuthStore from '../../store/AuthStore';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import { API_BASE } from '../../config/env';
import Layout from '../../layout/Layout';

export default function LoginPage() {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);

    const login = AuthStore((state) => state.login);
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        console.log("API")
        console.log(import.meta.env.MODE);
        e.preventDefault();
        setLoad(true);

        try {
            const res = await axios.post(`${API_BASE}/user/login`,
                {
                    email,
                    password,
                }
            );
            login(res.data);
            navigate("/main", { replace: true });
        } catch (e) {
            const status = e.response?.status;
            const code = e.response?.data?.code;
            const message = e.response?.data?.msg;
            console.log(status, code, message);
            alert(message);
            setLoad(false);
        }
    }
    if (load) {
        return (
            <>
                <h2 className='loading'>
                    <span className='loading-text'>Loading </span>
                    <br /><br />
                    <span>
                        첫 로그인 시 최대 1~2분 정도<br />
                        소요될 수 있습니다.</span></h2>
                <br /><br />

                <p className='loading-desc'> 원인 ✅ 서버가 일정 시간 미접속 시 절전 상태로 전환됩니다. </p>
            </>
        )
    }


    return (
        <div>
            <p>version 1.1</p>
            {import.meta.env.DEV && (
                <button
                    onClick={() => {
                        AuthStore.setState({
                            isLogin: true, user: {
                                id: null,
                            }
                        });
                        navigate("/main");
                    }}
                >
                    DEV: 바로 입장
                </button>
            )}
            <Layout backbtn={false} logoutBtn={false}>
                <form onSubmit={handleLogin} className='auth-wrap'>
                    <div className='auth-wrap-left'>
                        <h1> 안녕하세요 </h1>
                        <br />
                        <p>서비스 이용을 위해 로그인을 해주세요. </p>
                    </div>
                    <div className='auth-wrap-right'>
                        <div className='auth-input-box'>
                            <p> Email </p>
                            <input type="email" placeholder='이메일'
                                value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <div className='auth-input-box'>
                            <p> Password </p>
                            <input type="password" placeholder='비밀번호' autoComplete="current-password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='login-submit'>
                            <button type='submit' style={{ color: "rgba(255,255,255,0.87)" }}>Login</button>
                            <ul className='login-options-menu'>
                                <li onClick={() => alert("api 준비중")}  >아이디 찾기</li>
                                <li onClick={() => alert("api 준비중")}  >비밀번호 찾기</li>
                                <li onClick={() => navigate("/join")} className='point-b'> 회원가입 </li>
                            </ul>
                            <br />
                        </div>
                    </div>
                </form>
            </Layout>
        </div>
    )
}
