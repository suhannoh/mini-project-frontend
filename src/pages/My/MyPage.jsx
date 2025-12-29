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
    <div className="page-enter2">
      <BackBtn />
      <div className='my-page-wrap'>
        {/* 사용자 정보 표시 */}

        <ul className='my-info-list'>
          <li> <span>이름 :   </span> <span> {user.name } </span></li>
          <li> <span>이메일 : </span> <span>{user.email}</span></li>
          <li> <span>전화번호 :</span> <span>{user.phone=="" ? "비어있습니다" : user.phone}</span></li>
          <li> <span>성별 :   </span> <span>{ gender[user.gender] } </span></li>
          <li> <span>비밀번호 : </span> <span className='my-info-password'>
            <span className='my-info-password-text'>{isMask ? maskedPassword : maskedPw} </span>&nbsp;&nbsp;
            <button onClick={() => setIsMask(!isMask)}>
              {isMask 
              ? <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                <circle cx="12" cy="12" r="2.5"/>
              </svg>
              :
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 4l18 18-1.5 1.5-3.2-3.2A10.8 10.8 0 0 1 12 21C5 21 2 14 2 14a20 20 0 0 1 4.1-5.5L1.5 5.5 3 4z"/>
                <path d="M12 5c7 0 10 7 10 7a19.7 19.7 0 0 1-3.4 4.6l-2.2-2.2A4 4 0 0 0 9.6 8L7.8 6.2A10.7 10.7 0 0 1 12 5z"/>
              </svg> }

              </button></span></li>
        </ul>
        <ul className='my-info-list'>
          <li> <span> 회원가입 날짜 : </span> <span>{formatDateTime(user.createdAt)}</span></li>
          <li> <span>최근 수정한 날짜 : </span><span>{formatDateTime(user.updatedAt)}</span></li>
          
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
