import AuthStore from '../../store/AuthStore';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import Layout from '../../layout/Layout';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';
import Loading from '../../components/Loading';

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
    // API 환경
    const [API , setAPI] = useState(false);
    const [APIload , setAPILoad] = useState(true);
              

    
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
            // console.log("로그인 처리" , data);
            // 메인 페이지로 이동
            navigate("/main", { replace: true });
        } catch (e) {
            logError(e);
            // 로딩 종료
            setLoad(false);
        }
    }
    
    // API 환경 확인
    useEffect(() => {
        const apiPingCheck = async () => {
            try {
                // 세션 확인
                await api.get("/auth/api/ping");
                // 세션 유효
                setAPI(true);
            } catch {
                // 세션 무효

                setAPI(false);  
            } finally {
                setAPILoad(false);
            }
        }
        apiPingCheck();
    }, []);

    // 로딩 중일 때
    if (load) {
      return (
          <Loading text={"로그인"}/>
        )
    }



    return (
        <div>
          <div className='auth__header'>
              <p>version 1.0.0 </p>
                <div className='main__api-health'>
                  <h2> API(서버연결) 상태 : {APIload ? " 로딩 중 (서버 깨우는 중)..."
                                                : API
                                                ? " 🟢 정상"
                                                : " 🔴 비정상 - 배포 및 수정 중"}
                  </h2>
              </div>
            </div>
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
                        <div className='auth__field input-ani'>
                            {/* <p> Email </p> */}
                            <input type="email" 
                            placeholder=''
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label >이메일</label>
                        </div>
                        <div className='auth__field input-ani'>
                            {/* <p> Password </p> */}
                            <input type="password"
                             placeholder='' 
                             autoComplete="current-password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label>비밀번호</label>
                        </div>
                        <div className='auth__actions'>
                            <button type='submit'>Login</button>
                            <ul className='auth__options-menu'>
                                <li onClick={() => alert("api 준비중")}  >아이디 찾기</li>
                                <li onClick={() => navigate("/find-password")}  >비밀번호 찾기</li>
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
