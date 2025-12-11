import './comp.css'
import AuthStore from '../store/AuthStore'

export default function LogoutBtn() {
     const logout = AuthStore((state) => state.logout);
  return (
    <div>
        <button id='logout-btn' onClick={logout}>Logout</button>
    </div>
  )
}
