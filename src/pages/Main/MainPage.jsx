import { useEffect, useState } from 'react'
import './MainPage.css'
import AuthStore from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { api } from '../../api/auth';

export default function MainPage() {
  // 활성 사용자 목록
  const [activeUsers , setActiveUsers] = useState([]);
  // 인증 정보
  const { user , theme } = AuthStore();
  // API 상태
  const [userAPI , setUserAPI] = useState(false);
  const [activeUserAPI , setActiveUserAPI] = useState(false);
  const [linkAPI , setLinkAPI] = useState(false);
  const [postAPI , setPostAPI] = useState(false);
  //  네비게이트
  const navigate = useNavigate();


  // 활성 사용자 목록 불러오기
   useEffect(() => {
        const getActiveUsers = async () => {
            try {
                const res = await api.get(`/useractive`);
                // 정상 응답 후 상태 업데이트
                setActiveUsers(res.data);
            } catch (e) {
              // 로그 에러 처리
                const status = e.response?.status;
                const code = e.response?.data?.code;
                const message = e.response?.data?.msg;
                console.log(status, code, message);
            } 
        };
        // 호출
        getActiveUsers();
    }, []);

    // 각 API 헬스체크
    useEffect(() => {
    const check = async (url, setState) => {
      try {
        await api.get(url);
        // 정상 응답
        setState(true);
      } catch (e) {
        alert(e.response.data.msg);
        // 오류 응답
        setState(false);
      }
    };

    // 헬스체크 호출
    check(`/auth/health`, setUserAPI);
    check(`/useractive/health`, setActiveUserAPI);
    check(`/link/health`, setLinkAPI);
    check(`/post/health`, setPostAPI);
    
  }, []);


  return (
    <div>
      <div className='main__api'> 
        <h2> API 상태 </h2>
        {/* API 상태 표시 */}
        <div className='main__api-health'>
          <div>
            <p> Post API : {postAPI ? "🟢" : "🔴"} </p>
            <p> Link API : {linkAPI ? "🟢" : "🔴"}</p>
          </div>
          <div>
            <p> Active User API : {activeUserAPI ? "🟢" : "🔴"}</p>
            <p> User API : {userAPI ? "🟢" : "🔴"}</p>
          </div>
        </div>
      </div>
        <Layout backbtn={false} >
          <div className='main__wrap'>
            <div className='main__top-layout'>
            {/* grid로 변경 예정 */}
             <ul className='main__card-ul'>
              <li className='main__card-li ' onClick={() => navigate('/posts')} >
                <div className={theme ? "main__card-title" :  "main__card-title-w"}>
                  <h2>📝 게시판</h2>
                </div>
                <div className='main__card-content'>
                  <p> 자유 / 질문 / 개발정보</p>
                </div>
              </li>
              <li className='main__card-li' onClick={() => navigate('/links')}  >
                <div className={theme ? "main__card-title" :  "main__card-title-w"} style={{color:"greenYellow"}}>
                  <h2>🔗 Links</h2>
                </div>
                 <div className='main__card-content'>
                  <p> Notion / GitHub 주소 공유</p>
                </div>
              </li>
             </ul>
          </div>

          <div className='main__bottom-layout'>
            <ul className='main__card-ul'>
              <li className='main__card-li' onClick={() =>navigate('/mini-tools')}>
                <div className={theme ? "main__card-title" :  "main__card-title-w"}>
                  <h2>🧪 실험실</h2>
                </div>
                  <div className='main__card-content'>
                    <p> 기능 미구현 ... UI 만 ,,,</p>
                  {/* <p> 개발하며 구현한 작은 기능들을<br />
                      직접 체험해보세요</p> */}
                </div>
              </li>
              <li className='main__card-li' onClick={() => navigate('/my')}>
                <div className={theme ? "main__card-title" :  "main__card-title-w"}>
                  <h2>👤 마이페이지</h2>
                </div>
                  <div className='main__card-content'>
                  <p>  {user ? `${user.name}님, 안녕하세요` : "loading,,,"}</p>
                </div>
              </li>
             </ul>
          </div>
        </div>
        
        <div className='bar'>&nbsp;</div>
        <div className='online-list'>
          <h3 className='online-title'> 최근 1시간 이내 접속 </h3>
          <ul className='online-users'>
            {activeUsers.map((user) => (
              <li className="online-li" key={user.userId}>🟢 <span style={{paddingLeft:"5px"}}>{user.userName}</span></li>
            ))}
          </ul>
        </div>
      </Layout>
    </div>
  )
}
