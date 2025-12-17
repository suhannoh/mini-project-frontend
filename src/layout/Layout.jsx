import './Layout.css'
import Theme from '../components/theme'
import LogoutBtn from '../components/LogoutBtn'
import BackBtn from '../components/BackBtn'
import PostBtn from '../components/PostBtn'
export default function Layout({ children , backbtn=true , logoutBtn=true , postBtn=false , textInput=false}) {
  
  const btn = (e) => {
     e.preventDefault();
    alert("Comment API 준비중");
  }

  return (
    <>
      <div className='layout-top-options'>
        {backbtn && <BackBtn />}
        {postBtn && <PostBtn />}
      </div>
      <div className='layout-wrap' 
           style={{
            borderBottomLeftRadius : textInput ? "none" : "10px",
            borderBottomRightRadius : textInput ? "none" : "10px"
            }}>  
        {children}
      </div>
      <div className='layout-options' style={{
        borderRadius : textInput ? "10px" : "",
        }}>
        {textInput && <div className='layout-option-input'>
          <form className='layout-option-input-wrap' onSubmit={btn}>
            <input type="text" placeholder='댓글을 입력해주세요' /> 
            <button type='submit' className='layout-option-submit'> ▷ </button> 
          </form> 
        </div>}
        <div className={textInput ? 'layout-options-btn' : "layout-options-btn-default"}>
          <Theme /> 
          {logoutBtn && <LogoutBtn />}
        </div>
      </div>
    </>
  )
}
