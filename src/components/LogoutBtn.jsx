import './comp.css'
import AuthStore from '../store/AuthStore'
import { useNavigate } from 'react-router-dom';

export default function LogoutBtn() {
     const logout = AuthStore((state) => state.logout);
     const navigate = useNavigate();

     const handleLogout = () => {
      logout();
      navigate("/");
     }
  return (
    <div className='flexJustfyRight'>
        <button id='logout-btn' onClick={handleLogout}>Logout</button>
    </div>
  )
}