import AuthStore from '../store/AuthStore'
import './comp.css'

export default function Theme() {
    const {theme , toggleTheme} = AuthStore();
    const handelToggleTheme = () => {
        toggleTheme();
    }
  return (
    <div>
        <button className='theme-btn' style={{height:"100%"}}
        onClick={handelToggleTheme}><span 
        className={`theme-spin-icon ${theme ? "dark" : "light"}`}>{theme ? "🌙" : "☀️"}</span></button>
    </div>
  )
}
