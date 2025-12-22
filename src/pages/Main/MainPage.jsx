import React, { useEffect, useState } from 'react'
import './MainPage.css'
import AuthStore from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from '../../components/button/LogoutBtn';
import axios from 'axios';
import { API_BASE } from '../../config/env';
import Theme from '../../components/theme';
import Layout from '../../layout/Layout';

export default function MainPage() {
  const [activeUsers , setActiveUsers] = useState([]);
  const { user , theme } = AuthStore();
  const [userAPI , setUserAPI] = useState(false);
  const [activeUserAPI , setActiveUserAPI] = useState(false);
  const [linkAPI , setLinkAPI] = useState(false);
  const [postAPI , setPostAPI] = useState(false);
  
  const navigate = useNavigate();
  
   useEffect(() => {
        const getActiveUsers = async () => {
            try {
                const res = await axios.get(`${API_BASE}/useractive`);
                setActiveUsers(res.data);
            } catch (e) {
                const status = e.response?.status;
                const code = e.response?.data?.code;
                const message = e.response?.data?.msg;
                console.log(status, code, message);
            } 
        };
        getActiveUsers();
    }, []);

    useEffect(() => {
    const check = async (url, setState) => {
      try {
        await axios.get(url);
        setState(true);
      } catch (e) {
        alert(e.response.data.msg);
        setState(false);
      }
    };

    check(`${API_BASE}/user/health`, setUserAPI);
    check(`${API_BASE}/useractive/health`, setActiveUserAPI);
    check(`${API_BASE}/user/links/health`, setLinkAPI);
    check(`${API_BASE}/posts/health`, setPostAPI);
    setPostAPI(false);
    // check(`${API_BASE}/post/health`, setPostAPI);  // Post도 만들거면 이렇게
  }, []);


  return (
    <div>
      <div className='api'> 
        <h2> API 상태 </h2>
        <div className='api-health'>
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
          <div className='main-wrap'>
            <div className='main-top-layout'>
            {/* grid로 변경 예정 */}
             <ul className='main-card-ul'>
              <li className='main-card ' onClick={() => navigate('/posts')} >
                <div className={theme ? "main-card-title" :  "main-card-title-w"}>
                  <h2>📝 게시판</h2>
                </div>
                <div className='main-card-content'>
                  <p> 자유 / 질문 / 개발정보</p>
                </div>
              </li>
              <li className='main-card' onClick={() => navigate('/links')}  >
                <div className={theme ? "main-card-title" :  "main-card-title-w"} style={{color:"greenYellow"}}>
                  <h2>🔗 Links</h2>
                </div>
                 <div className='main-card-content'>
                  <p> Notion / GitHub 주소 공유</p>
                </div>
              </li>
             </ul>
          </div>
          <div className='main-bottom-layout'>
            <ul className='main-card-ul'>
              <li className='main-card' onClick={() =>navigate('/mini-tools')}>
                <div className={theme ? "main-card-title" :  "main-card-title-w"}>
                  <h2>🧪 실험실</h2>
                </div>
                  <div className='main-card-content'>
                    <p> 기능 없음</p>
                  {/* <p> 개발하며 구현한 작은 기능들을<br />
                      직접 체험해보세요</p> */}
                </div>
              </li>
              <li className='main-card' onClick={() => navigate('/my')}>
                <div className={theme ? "main-card-title" :  "main-card-title-w"}>
                  <h2>👤 마이페이지</h2>
                </div>
                  <div className='main-card-content'>
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
