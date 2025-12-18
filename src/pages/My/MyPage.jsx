import { useState } from 'react'
import './MyPage.css'
import LogoutBtn from '../../components/LogoutBtn'
import BackBtn from '../../components/BackBtn'
import AuthStore from '../../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import Theme from '../../components/theme'

export default function MyPage() {
  const { user } = AuthStore();
  const [isMask, setIsMask] = useState(true);
  const maskedPassword = '*'.repeat(user?.password?.length ?? 0);
  const navigate = useNavigate();
  return (
    <div>
      <BackBtn />
      <div className='my-page-wrap'>
        <ul className='my-info-list'>
          <li> 이름 : {user.name} </li>
          <li> 이메일 : {user.email}</li>
          <li> 비밀번호 : {isMask ? maskedPassword : user.password}
            <button onClick={() => setIsMask(!isMask)}>보기</button></li>
        </ul>
        <ul className='my-info-list my-log'>
          <li> 회원가입 날짜 : {user.createdAt}</li>
          <li> 최근 수정한 날짜 : {user.updatedAt}</li>
        </ul>
        <button onClick={() => navigate('/my/edit')}> 수정 </button>
      </div>
      <div className='layout-options'>
              <Theme />
              <LogoutBtn />
            </div>
    </div>
  )
}
