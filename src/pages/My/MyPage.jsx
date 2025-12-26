import { useState } from 'react'
import './MyPage.css'
import LogoutBtn from '../../components/button/LogoutBtn'
import BackBtn from '../../components/button/BackBtn'
import AuthStore from '../../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import Theme from '../../components/theme'
import { formatDateTime } from '../../components/date/dateTime'
import { maskPassword } from '../../components/maskPw'
import { logError } from '../../components/logError'
import { api } from '../../api/auth'
export default function MyPage() {
  
  // 전역 상태 사용자 정보 가져오기
  const { user , logout} = AuthStore();
  // 비밀번호 마스킹 상태
  const [isMask, setIsMask] = useState(true);
  // 마스킹된 비밀번호 생성
  const maskedPassword = '*'.repeat(user?.password?.length ?? 0);
  const maskedPw = maskPassword(user?.password);
  // 페이지 네비게이트
  const navigate = useNavigate();

  const gender = {
    MALE : "남자",
    FEMALE : "여자",
    NONE : "선택 없음"
  }

  const handleDeleteMyAccount = async () => {
    const ok = confirm("정말 탈퇴하시겠습니까 ?");
    if(!ok) return;
    try {
      await api.delete(`/user/delete`, {
        params : {id : user.id}
      });
      alert("탈퇴 완료되었습니다.");
      logout();
      navigate("/");
    } catch (e) {
      logError(e);
    }

  }
  
  maskedPassword
  return (
    <div>
      <BackBtn />
      <div className='my-page-wrap'>
        {/* 사용자 정보 표시 */}
        <ul className='my-info-list'>
          <li> 이름 : {user.name } </li>
          <li> 이메일 : {user.email}</li>
          <li> 전화번호 : {user.phone=="" ? "비어있습니다" : user.phone}</li>
          <li> 성별 : { gender[user.gender] } </li>
          <li> 비밀번호 : {isMask ? maskedPassword : maskedPw}
            <button onClick={() => setIsMask(!isMask)}>보기</button></li>
        </ul>
        <ul className='my-info-list my-log'>
          <li> 회원가입 날짜 : {formatDateTime(user.createdAt)}</li>
          <li> 최근 수정한 날짜 : {formatDateTime(user.updatedAt)}</li>
          
          <h2 className='my-log-title'> 보기 옵션 </h2>
          <ul className='my-log-btn'>
            <li>
              <button onClick={() => navigate('/my/post')}> 내가 쓴 글 </button>
              <button onClick={() => navigate('/my/comment')}> 내가 쓴 댓글 </button>
            </li>
            <li>
              <button onClick={() => navigate('/my/edit')}>내 정보 수정 </button>
              <button onClick={handleDeleteMyAccount} id='delete-account'>
                  탈퇴
                </button> 
            </li>
          </ul>
        </ul>


  
      </div>
      {/* 테마 및 로그아웃 버튼 */}
      <div className='layout-options'>
              <Theme />
              <LogoutBtn />
            </div>
    </div>
  )
}
