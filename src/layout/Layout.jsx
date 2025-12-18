import './Layout.css'
import Theme from '../components/theme'
import LogoutBtn from '../components/LogoutBtn'
import BackBtn from '../components/BackBtn'
import PostBtn from '../components/PostBtn'
import { useState } from 'react'
import axios from 'axios'
import AuthStore from '../store/AuthStore'
import { API_BASE } from '../config/env'
export default function Layout({ children , backbtn=true , logoutBtn=true , postBtn=false ,
                                 textInput=false , postId=null , commentMethod}) {
  
  const [comment, setComment] = useState("");
  const {user} = AuthStore();
  const commentSubmitHandler = async (e) => {
     e.preventDefault();
     try {
          await axios.post(`${API_BASE}/post/comment` , {
          postId,
          userId : user.id,
          comment
        })
        setComment("");
        commentMethod();
     } catch {
        console.log("error 발생 !!")
     }
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
          <form className='layout-option-input-wrap' onSubmit={commentSubmitHandler}>
            <input onChange={(e) => setComment(e.target.value)} 
                   value={comment} type="text" placeholder='댓글을 입력해주세요' /> 
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
