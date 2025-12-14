import { useEffect, useState } from 'react'
import './MyPage.css'
import AuthStore from '../../store/AuthStore';
import BackBtn from '../../components/BackBtn';
import axios from 'axios';
import { API_BASE } from '../../config/env';
import { useNavigate } from 'react-router-dom';

export default function MyEditPage() {
  const {user , login} = AuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone , setPhone ] = useState("");
  
  const isMatch = password.length > 0 && passwordConfirm.length > 0 &&
                password === passwordConfirm;

  useEffect(() => {
    if (!user) return;
    setEmail(user.email ?? "");
    setName(user.name ?? "");
    setPhone(user.phone ?? "");
    setPassword(user.password ?? "");
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/user/${user.id}/edit`,
      {
        email,
        name,
        password,
        phone,
      })
      login(res.data);
      alert("수정이 성공적으로 완료되었습니다");
      navigate(-1);
    } catch (e) {
      console.log(e);
    }
    
  }
  return (
    <div>
         <BackBtn />
                  <div className='my-page-wrap'>
                        <form onSubmit={handleUpdate}>
                            <ul>
                              <li><span>이름 : </span><input type="text" value={name} 
                                          onChange={(e) => setName(e.target.value)}/></li>
                              <li> <span>이메일 : </span> <input type="email" value={email}
                                          onChange={(e) => setEmail(e.target.value)}/></li>
                              <li><span> 전화번호 : </span> <input type="tel" value={phone}
                                            onChange={(e) => setPhone(e.target.value)}/> </li>            
                            </ul>
                            <ul>
                              <li> <span>비밀번호 : </span>  <input type="password" value={password}
                                            onChange={(e) => setPassword(e.target.value)}/> </li>
                              <li> <span>비밀번호 재확인 : </span>  <input type="password" value={passwordConfirm}
                                            onChange={(e) => setPasswordConfirm(e.target.value)}/> </li>              
                              <div id='my-page-edit-btn'>
                                <span className='red-green'>{isMatch ? "🟢" : "🔴"}</span> 
                                <button style={{background : isMatch ? "" : "gray"}} type='submit' disabled={!isMatch}> 수정 </button>
                              </div>
                            </ul>
                        </form>  
                  </div>
    </div>
  )
}
