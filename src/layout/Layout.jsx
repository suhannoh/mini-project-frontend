import './Layout.css'
import Theme from '../components/theme'
import LogoutBtn from '../components/button/LogoutBtn'
import BackBtn from '../components/button/BackBtn'
import PostBtn from '../components/button/PostBtn'
import { useState } from 'react'
import axios from 'axios'
import AuthStore from '../store/AuthStore'
import { API_BASE } from '../config/env'
import EditBtn from '../components/button/EditBtn'
import PostDeleteBtn from '../components/button/PostDeleteBtn'
import LikeBtn from '../components/button/LikeBtn'
export default function Layout({ children , backbtn=true , logoutBtn=true , postBtn=false ,
                                 textInput=false , postId=null , commentMethod , editBtn=false,
                                 post , backNavi=null, likeBtn=false }) {
  
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
        {backbtn && <BackBtn navi={backNavi}/>}
        <div className='layout__post--buttons'>
          {postBtn && <PostBtn />}
          {likeBtn && <LikeBtn post={post}/>}
          {editBtn && <EditBtn post={post}/>}
          {editBtn && <PostDeleteBtn />}
        </div>
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
