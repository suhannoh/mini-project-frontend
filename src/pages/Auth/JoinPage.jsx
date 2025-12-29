import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';
import Loading from '../../components/Loading';

export default function JoinPage() {
  // 사용자 입력 
  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState("");// 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState("");// 비밀번호 확인
  const [name, setName] = useState(""); // 이름
  const [phone, setPhone] = useState(""); // 전화번호
  const [gender , setGender] = useState("NONE"); // 성별  
  // 네비게이트
  const navigate = useNavigate();
  // 로딩 상태
  const [load, setLoad] = useState(false);
  // 비밀번호 일치 여부
  const isMatch = password.length > 0 && passwordConfirm.length > 0 &&
                  password === passwordConfirm;
  // 중복 요청을 막기위한 상태값
  const [isSubmit, setIsSubmit] = useState(false);            
  
  // 회원가입 처리
  const handleJoin = async (e) => {
    e.preventDefault();
    // 중복 요청을 막기위한 상태값 설정
    setIsSubmit(true);

    // 프론트에서 입력 검증
    if (!email.trim() || !password.trim() || !name.trim()) {
      return alert("공백은 입력할 수 없습니다");
    }
    if (password.length < 5) {
      return alert("비밀번호는 5자리 이상입니다");
    }
    // 로딩 시작
    setLoad(true);

    try {// 회원가입 요청
      await api.post(`/auth/signup`,{ email, password, name, phone, gender});
      alert("회원가입 성공!");
      navigate("/") // 로그인 페이지로 이동
    } catch (e) {
      logError(e);
    } finally {
      setLoad(false); // 로딩 종료
      setIsSubmit(false); // 중복 요청을 막기위한 상태값 설정 돌리기 
    }
  };
  
  // 로딩 중일 때
  if (load) {
    return (
      <Loading text={"회원가입"} />
    )
  }

  return (
    <div>
      <Layout logoutBtn={false}>
        {/* 회원가입 폼 */}
        <main className='auth__wrap auth__join-wrap'>
          <section className='auth__info auth__info-join'>
            <h1> 회원가입 </h1> <br />
            <p>서비스 이용을 위해 계정을 생성해주세요. </p> <br />
            <p>⚠️ 이 웹 사이트는 학습용입니다 <br />
              <span className='red-text'> 실제 개인정보를 이용하지 마세요 </span>
            </p>
          </section>

          <section className='auth__form auth__form-join'>        
            <form onSubmit={handleJoin}> 

              <div className='auth__field input-ani'>
                <input id="email" type="email" placeholder=''
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='email'>
                  <span className='red-text'>* </span> 이메일 </label>  
              </div>

              <div className='auth__field-flex'>
                <div className='auth__field input-ani'>
                  <input id='name' type="text" placeholder=''
                    value={name} onChange={(e) => setName(e.target.value)} />
                  <label htmlFor='name'><span className='red-text'>* </span> 이름 </label>  
                </div>

                <div className='auth__field input-ani'>
                  <input id='phone' type="tel" placeholder=''
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <label htmlFor='phone'>번호 <span className='sm-span'>(010-1234-5678)</span></label>
                </div>
              </div>

              <div className='auth__field-flex'>
                <div className='auth__field input-ani'>
                  <input id='password' type="password" placeholder='' autoComplete='new-password'
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password"><span className='red-text'>* </span>비밀번호</label>
                </div>

                <div className='auth__field auth__field-radio '>
                  <p className='sm-span'> 성별: {gender} </p>
                  <div className='auth__radio-box '>
                    <label><input type='radio' name='gender' value="NONE" 
                    onChange={(e) => setGender(e.target.value)} checked={gender == "NONE"}/> 미선택 </label>
                    <label><input type='radio' name='gender' value="MALE"
                    onChange={(e) => setGender(e.target.value)} checked={gender == "MALE"} /> 남자 </label>
                    <label><input type='radio' name='gender' value="FEMALE" 
                    onChange={(e) => setGender(e.target.value)} checked={gender == "FEMALE"} /> 여자 </label>
                  </div>
                </div>
              </div>

              <div className='auth__field input-ani'>
                <input id="passwordConfirm" type="password" placeholder=''
                  value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                <label htmlFor="passwordConfirm"><span className='red-text'>* </span>비밀번호 재확인 {isMatch ? "🟢" : "🔴"} </label>
              </div>

              <div className='auth__join-actions'>
                <button style={{ background: isMatch ? "" : "gray" }}
                type='submit' disabled={!isMatch || isSubmit} id='auth__join-btn'> {isSubmit ? "가입중" : "회원가입"}</button>
              </div>
            </form>
          </section>
        </main>
      </Layout>
    </div>
  )
}
