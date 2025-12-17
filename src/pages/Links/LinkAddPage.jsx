import React, { useEffect, useState } from 'react'
import AuthStore from '../../store/AuthStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../components/BackBtn';
import { API_BASE } from '../../config/env';
import LinkStore from '../../store/LinkStore';


export default function LinkAddPage() {

  const [notionUrl , setNotion] = useState("");
  const [gitHubUrl , setGithub] = useState("");
  const navigate = useNavigate();
  const {user } = AuthStore();
  const {linkStore} = LinkStore();

  useEffect (() => {
    if (linkStore) {
      setNotion(linkStore.notionUrl ?? "");
      setGithub(linkStore.gitHubUrl ?? "");
    }
  }, [linkStore]);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      if(linkStore) {
        await axios.put(`${API_BASE}/user/links`,
           {
             notionUrl,
             gitHubUrl,
             userId : linkStore.user_id
           }
       );
       alert("Link를 성공적으로 수정하였습니다.")

      } else {
        await axios.post(`${API_BASE}/user/links`,
           {
             notionUrl,
             gitHubUrl,
             userId : user.id
           }
       );
       alert("Link를 성공적으로 저장하였습니다.")
      }
    } catch (e) {
        alert("예상치 못한 오류로 저장에 실패하였습니다." + e);
    } finally {
      navigate("/links" ,{ replace: true });
    }
  }

  return (
    <div>
      <BackBtn />
      <div className='link-add-page-wrap'>
        <div>
          <div className='main-left-top add-link'>
            <form onSubmit={handleAdd}>
            <ul className='link-add-ul' >
                <li>GitHub : <input id="git" type="url" value={gitHubUrl} placeholder='github - url' name="gitHubUrl"
                               onChange={(e) => setGithub(e.target.value)}/></li>
                <li>Notion : <input id="notion" type="url" value={notionUrl} placeholder='notion - url' name="notionUrl"
                               onChange={(e) => setNotion(e.target.value)} /></li>
            </ul>
            <button className="post-edit-submit-btn" type='submit'>저장</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  }