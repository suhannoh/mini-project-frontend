import React, { useEffect, useState } from 'react'
import './MainPage.css'
import AuthStore from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from '../../components/LogoutBtn';
import axios from 'axios';
import { API_BASE } from '../../config/env';

export default function MainPage() {
  const [activeUsers , setActiveUsers] = useState([]);
  const navigate = useNavigate();
  
   useEffect(() => {
        const getActiveUsers = async () => {
            try {
                const res = await axios.get(`${API_BASE}/useractive`);
                setActiveUsers(res.data);
            } catch (e) {
                console.log(e);
            } 
        };
        getActiveUsers();
    }, []);


  return (
    <div>
        <div className='main-page-wrap'>
          <div>
          <div className='main-left-top'>
             <ul className='menu-list'>
              <li className='main-card ' onClick={() => navigate('/posts')} >
                <div className="main-card-title">
                  <h2>📝 게시판</h2>
                </div>
                <div className='main-card-content'>
                  <p> 미구현 ,, api 준비중 ,, </p>
                </div>
              </li>
              <li className='main-card' onClick={() => navigate('/links')}  >
                <div className="main-card-title" style={{color:"greenYellow"}}>
                  <h2>🔗 Links</h2>
                </div>
                 <div className='main-card-content'>
                  <p> Notion / GitHub 주소 공유</p>
                </div>
              </li>
             </ul>
          </div>
          <div className='main-left-bottom'>
            <ul className='menu-list'>
              <li className='main-card' onClick={() =>navigate('/dummy')}>
                <div className="main-card-title">
                  <h2>⚙️ API </h2>
                </div>
                  <div className='main-card-content'>
                  <p>미구현 ,, api 준비중 ,, </p>
                </div>
              </li>
              <li className='main-card' onClick={() => navigate('/my')}>
                <div className="main-card-title">
                  <h2>👤 마이페이지</h2>
                </div>
                  <div className='main-card-content'>
                  <p>{AuthStore.getState().user.name}님, 안녕하세요 </p>
                </div>
              </li>
             </ul>
          </div>
        </div>
        <div className='bar'>&nbsp;</div>
        <div className='main-right'>
          <h2 className='now-title'> 최근 1시간 이내 접속 </h2>
          <ul className='now-users'>
            {activeUsers.map((user) => (
              <li className="now-li" key={user.id}>🟢 <span style={{paddingLeft:"5px"}}>{user.userName}</span></li>
            ))}
          </ul>
        </div>
        </div>
          <LogoutBtn />
    </div>
  )
}
