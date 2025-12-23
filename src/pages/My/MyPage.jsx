import { useState } from 'react'
import './MyPage.css'
import LogoutBtn from '../../components/button/LogoutBtn'
import BackBtn from '../../components/button/BackBtn'
import AuthStore from '../../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import Theme from '../../components/theme'
import { formatDateTime } from '../../components/date/dateTime'
export default function MyPage() {
  
  // 전역 상태 사용자 정보 가져오기
  const { user } = AuthStore();
  // 비밀번호 마스킹 상태
  const [isMask, setIsMask] = useState(true);
  // 마스킹된 비밀번호 생성
  const maskedPassword = '*'.repeat(user?.password?.length ?? 0);
  // 페이지 네비게이트
  const navigate = useNavigate();

  
  return (
    <div>
      <BackBtn />
      <div className='my-page-wrap'>
        {/* 사용자 정보 표시 */}
        <ul className='my-info-list'>
          <li> 이름 : {user.name} </li>
          <li> 이메일 : {user.email}</li>
          <li> 전화번호 : {user.phone}</li>
          <li> 비밀번호 : {isMask ? maskedPassword : user.password}
            <button onClick={() => setIsMask(!isMask)}>보기</button></li>
        </ul>
        <ul className='my-info-list my-log'>
          <li> 회원가입 날짜 : {formatDateTime(user.createdAt)}</li>
          <li> 최근 수정한 날짜 : {formatDateTime(user.updatedAt)}</li>
        </ul>
        {/* 수정 버튼 */}
        <button onClick={() => navigate('/my/edit')}> 수정 </button>
      </div>
      {/* 테마 및 로그아웃 버튼 */}
      <div className='layout-options'>
              <Theme />
              <LogoutBtn />
            </div>
    </div>
  )
}
