import React from 'react'
import './MainPage.css'
import AuthStore from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from '../components/LogoutBtn';

export default function MainPage() {

  const navigate = useNavigate();
  

  return (
    <div>
        <div className='main-page-wrap'>
          <div>
          <div className='main-left-top'>
             <ul className='menu-list'>
              <li className='main-card'>
                <div className="main-card-title">
                  <h2>📝 게시판</h2>
                </div>
                <div className='main-card-content'>
                  <p> 이동 </p>
                </div>
              </li>
              <li className='main-card' onClick={() => navigate('/links')}>
                <div className="main-card-title">
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
              <li className='main-card'>
                <div className="main-card-title">
                  <h2>⚙️ API </h2>
                </div>
                  <div className='main-card-content'>
                  <p>내용 들어갈 부분</p>
                </div>
              </li>
              <li className='main-card'>
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
          <h2 className='now-title'>접속중 </h2>
          <ul className='now-users'>
            <li>🟢 user 1</li>
            <li>🟢 user 2</li>
            <li>🟢 user 3</li>
            <li>🟢 user 4</li>
          </ul>
        </div>
        </div>
          <LogoutBtn />
    </div>
  )
}
