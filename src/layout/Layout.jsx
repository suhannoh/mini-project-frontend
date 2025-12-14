import './Layout.css'
import Theme from '../components/theme'
import LogoutBtn from '../components/LogoutBtn'
import BackBtn from '../components/BackBtn'
export default function Layout({ children , backbtn=true}) {
  
  return (
    <>
      {backbtn && <BackBtn />}
      <div className='layout-wrap'>
        {children}
      </div>
      <div className='layout-options'>
        <Theme />
        <LogoutBtn />
      </div>
    </>
  )
}
