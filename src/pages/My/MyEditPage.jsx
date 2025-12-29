import { useEffect, useState } from 'react'
import './MyPage.css'
import AuthStore from '../../store/AuthStore';
import BackBtn from '../../components/button/BackBtn';
import axios from 'axios';
import { API_BASE } from '../../config/env';
import { useNavigate } from 'react-router-dom';
import { logError } from '../../components/logError';

export default function MyEditPage() {
  // 테마 상태
  const { theme } = AuthStore();
  // 사용자 정보
  const { user, login } = AuthStore();
  const navigate = useNavigate();

  // 정보 수정 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  // 비밀번호 일치 여부
  const isMatch = password.length > 0 && passwordConfirm.length > 0 &&
    password === passwordConfirm;

  useEffect(() => {
    // 기존 사용자 정보로 폼 초기화
    if (!user) return;
    setEmail(user.email ?? "");
    setName(user.name ?? "");
    setPhone(user.phone ?? "");
    setPassword(user.password ?? "");
    setGender(user.gender ?? "");
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (user.email === email && user.password === password && user.name === name
      && user.phone === phone && user.gender === gender
    ) {
      alert("변경된 항목이 없습니다. 수정 항목을 확인해주세요");
      return;
    }
    // 정보 수정 요청
    try {
      const res = await axios.post(`${API_BASE}/user/${user.id}/edit`,
        { email, name, password, phone, gender });
      // 수정된 사용자 정보로 상태 업데이트                                    
      login(res.data);
      alert("수정이 성공적으로 완료되었습니다");
      // 이전 페이지로 이동
      navigate(-1);
    } catch (e) {
      logError(e);
    }

  }
  return (
    <div>
      <BackBtn />
      <main className='my-page-wrap'>
        {/* 수정 폼 */}
        <form onSubmit={handleUpdate} className={theme ? '' : 'mpw-w'} >
          <ul >
            <li>
              <span>이름 : </span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </li>
            <li>
              <span>이메일 : </span> 
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </li>
            <li>
              <span> 전화번호 : </span> 
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </li>
            <div className='auth__radio-box' style={{ padding: "1rem", justifyContent: "right" }}>
              <p> 성별 : </p>
              <label>
                <input type='radio' name='gender' value="NONE" 
                       onChange={(e) => setGender(e.target.value)} checked={gender == "NONE"} /> 없음 
                </label>
              <label>
                <input type='radio' name='gender' value="MALE"
                       onChange={(e) => setGender(e.target.value)} checked={gender == "MALE"} /> 남자 
              </label>
              <label>
                <input type='radio' name='gender' value="FEMALE"
                       onChange={(e) => setGender(e.target.value)} checked={gender == "FEMALE"} /> 여자 
              </label>
            </div>
          </ul>

          <ul>
            <li> 
              <span>비밀번호 : </span>  
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
            </li>
            <li> 
              <span>비밀번호 재확인 : </span> 
              <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
            </li>
            <div id='my-page-edit-btn'>
              <span className='red-green'>{isMatch ? "🟢" : "🔴"}</span>
              <button style={{ background: isMatch ? "" : "gray" }} type='submit' disabled={!isMatch}> 수정 </button>
            </div>
          </ul>
        </form>
      </main>
    </div>
  )
}
