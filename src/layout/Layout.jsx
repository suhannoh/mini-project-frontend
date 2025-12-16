import './Layout.css'
import Theme from '../components/theme'
import LogoutBtn from '../components/LogoutBtn'
import BackBtn from '../components/BackBtn'
import PostBtn from '../components/PostBtn'
export default function Layout({ children , backbtn=true , logoutBtn=true , postBtn=false }) {
  
  return (
    <>
      <div className='layout-top-options'>
        {backbtn && <BackBtn />}
        {postBtn && <PostBtn />}
      </div>
      <div className='layout-wrap'>
        {children}
      </div>
      <div className='layout-options'>
        <Theme />
        {logoutBtn && <LogoutBtn />}
      </div>
    </>
  )
}
