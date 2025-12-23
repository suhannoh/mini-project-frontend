import AuthStore from '../../store/AuthStore';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import Layout from '../../layout/Layout';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';

export default function LoginPage() {

    // 사용자 입력 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 로딩 상태
    const [load, setLoad] = useState(false);
    // 전역 상태
    const login = AuthStore((state) => state.login);
    // 네비게이트
    const navigate = useNavigate();


    // 로그인 처리
    const handleLogin = async (e) => {
        // 배포 및 개발 환경 출력
        console.log("API")
        console.log(import.meta.env.MODE);

        e.preventDefault();
        // 로딩 시작
        setLoad(true);

        try {
            await api.post("/auth/login",{ email, password,});
            const { data } = await api.get("/auth/me");
            // 전역 상태에 로그인 정보 반영
            login(data);
            // 메인 페이지로 이동
            navigate("/main", { replace: true });
        } catch (e) {
            logError(e);
            // 로딩 종료
            setLoad(false);
        }
    }

    // 로딩 중일 때
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
			{/* 개발 편의를 위한 버튼 */}
            {import.meta.env.DEV && (
                <button
                    onClick={() => {
                        AuthStore.setState({isLogin: true, user: {id: null,}});
                        navigate("/main");
                    }}> DEV: 바로 입장
                </button>
            )}
            <Layout backbtn={false} logoutBtn={false}>
                <form onSubmit={handleLogin} className='auth__wrap'>
									{/* 로그인 안내 */}
                    <div className='auth__info'>
                        <h1> 안녕하세요 </h1>
                        <br />
                        <p>서비스 이용을 위해 로그인을 해주세요. </p>   
                        <br />
                        <div className='auth__notice'>
                            {/* <p>공지</p> */}
                            <h3>📢 세션에 저장하는 방식으로 개선 후 <br />
                                모바일 환경에서 로그인 되지 않습니다 ... <br />
                                PC 환경에서 접속 부탁드리겠습니다 </h3>
                        </div>
                    </div>
										{/* 로그인 입력 폼 */}
                    <div className='auth__form'>
                        <div className='auth__field'>
                            <p> Email </p>
                            <input type="email" placeholder='이메일'
                                value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <div className='auth__field'>
                            <p> Password </p>
                            <input type="password" placeholder='비밀번호' autoComplete="current-password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='auth__actions'>
                            <button type='submit'>Login</button>
                            <ul className='auth__options-menu'>
                                <li onClick={() => alert("api 준비중")}  >아이디 찾기</li>
                                <li onClick={() => alert("api 준비중")}  >비밀번호 찾기</li>
                                <li onClick={() => navigate("/join")} className='is-point'> 회원가입 </li>
                            </ul>
                            <br />
                        </div>
                    </div>
                </form>
            </Layout>
        </div>
    )
}
