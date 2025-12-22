import '../comp.css'
import AuthStore from '../../store/AuthStore'
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/auth';

export default function LogoutBtn() {
     const {logout} = AuthStore();
     const navigate = useNavigate();
     const handleLogout = async () => {
      await api.post("/user/logout");
      logout();
      navigate("/");
     }
  return (
    <div className='flexJustfyRight'>
        <button id='logout-btn' onClick={handleLogout}>Logout</button>
    </div>
  )
}