import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';

export default function JoinPage() {
  // 사용자 입력 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // 네비게이트
  const navigate = useNavigate();
  // 로딩 상태
  const [load, setLoad] = useState(false);
  // 비밀번호 일치 여부
  const isMatch = password.length > 0 && passwordConfirm.length > 0 &&
                  password === passwordConfirm;

  // 회원가입 처리
  const handleJoin = async (e) => {
    e.preventDefault();

    // 입력 검증
    if (!email || !password || !name) {
      return alert("공백은 입력할 수 없습니다");
    }
    if (password.length < 5) {
      return alert("비밀번호는 5자리 이상입니다");
    }
    // 로딩 시작
    setLoad(true);

    try {// 회원가입 요청
      await api.post(`/auth/join`,{ email, password, name, phone,});
      alert("회원가입 성공!");
      // 로그인 페이지로 이동
      navigate("/")
    } catch (e) {
      logError(e);
      setLoad(false);
    }
  };
  
  // 로딩 중일 때
  if (load) {
    return (
      <h2 className='loading'>
        <span className='loading-text'>Loading </span>
        <br /><br />
        <span>첫 회원가입 시 20초 ~ 60초 정도 걸릴 수 있습니다.</span></h2>
    )
  }


  return (
    <div>
      <Layout logoutBtn={false}>
        {/* 회원가입 폼 */}
        <div className='auth__wrap auth__join-wrap'>
          <div className='auth__info'>
            <h1> 회원가입 </h1>
            <br />
            <p>서비스 이용을 위해 계정을 생성해주세요. </p>
            <br />
            <p>⚠️ 이 웹 사이트는 학습용입니다 <br /><span className='red-text'> 실제 개인정보를 이용하지 마세요 </span></p>
          </div>

          <div className='auth__form'>
            <form onSubmit={handleJoin} >
              <div className='auth__field'>
                <p><span className='red-text'>*</span> Email </p>
                <input type="email" placeholder='이메일 (필수)'
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='auth__field'>
                <p><span className='red-text'>*</span> Name </p>
                <input type="text" placeholder='이름 (필수)'
                  value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='auth__field'>
                <p> Phone </p>
                <input type="tel" placeholder='전화번호 010-1234-5678 (선택)'
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className='auth__field'>
                <p><span className='red-text'>*</span> Password </p>
                <input type="password" placeholder='비밀번호 5자리 이상 (필수) ' autoComplete='new-password'
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='auth__field'>
                <p><span className='red-text'>*</span> Password Confirm {isMatch ? "🟢" : "🔴"} </p>
                <input type="password" placeholder='비밀번호 재확인 (필수)'
                  value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
              </div>
              <div className='auth__join-actions'>
              <button style={{ background: isMatch ? "" : "gray" }}
                type='submit' disabled={!isMatch} id='auth__join-btn'> 전송 </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  )
}
