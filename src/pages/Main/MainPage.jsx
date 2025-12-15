import React, { useEffect, useState } from 'react'
import './MainPage.css'
import AuthStore from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from '../../components/LogoutBtn';
import axios from 'axios';
import { API_BASE } from '../../config/env';
import Theme from '../../components/theme';
import Layout from '../../layout/Layout';

export default function MainPage() {
  const [activeUsers , setActiveUsers] = useState([]);
  const { user , theme } = AuthStore();
  const navigate = useNavigate();
  
   useEffect(() => {
        const getActiveUsers = async () => {
            try {
                const res = await axios.get(`${API_BASE}/useractive`);
                setActiveUsers(res.data);
            } catch (e) {
                console.log("axios error", e);
                console.log("status", e?.response?.status);
                console.log("data", e?.response?.data); 
            } 
        };
        getActiveUsers();
    }, []);

  return (
    <div>
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
                  <p> 구현중 ,,, ~ </p>
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
              <li className='main-card' onClick={() =>navigate('/dummy')}>
                <div className={theme ? "main-card-title" :  "main-card-title-w"}>
                  <h2>⚙️ API </h2>
                </div>
                  <div className='main-card-content'>
                  <p>미구현 ,, api 준비중 ,, </p>
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
          <h2 className='online-title'> 최근 1시간 이내 접속 </h2>
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
