import { useEffect, useState } from 'react'
import AuthStore from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../components/button/BackBtn';
import LinkStore from '../../store/LinkStore';
import { api } from '../../api/auth';
import { logError } from '../../components/logError';



export default function LinkAddPage() {

  // 입력
  const [notionUrl , setNotion] = useState("");
  const [gitHubUrl , setGithub] = useState("");
  // 네비게이트
  const navigate = useNavigate();
  // 전역 상태
  const {user } = AuthStore();
  const {linkStore} = LinkStore();

  useEffect (() => {
    // 수정 모드일 때 기존 값 불러오기
    if (linkStore) {
      // 기존 값 세팅
      setNotion(linkStore.notionUrl ?? ""); 
      setGithub(linkStore.gitHubUrl ?? "");
    }
  }, [linkStore]);

  const handleAdd = async (e) => {
    e.preventDefault();
    // 링크 추가 or 수정
    try {
      if(linkStore) {
        // 수정 모드
        await api.put(`/user/links`,{ notionUrl, gitHubUrl, userId : linkStore.user_id });
        alert("Link를 성공적으로 수정하였습니다.")
      } else {
        // 추가 모드
        await api.post(`/user/links`, { notionUrl, gitHubUrl, userId : user.id });
        alert("Link를 성공적으로 저장하였습니다.")
      }
    } catch (e) {
      // 오류 로그
        logError(e);
    } finally {
      // 링크 목록으로 이동
      navigate("/links" ,{ replace: true });
    }
  }

  return (
    <div>
      <BackBtn />
      <div className='link__add-wrap'>
        <div>
          <div className='link__add-card'>
            <form onSubmit={handleAdd}>
            <ul className='link__add-ul' >
                <li>GitHub : <input id="git" type="url" value={gitHubUrl} placeholder='github - url' name="gitHubUrl"
                               onChange={(e) => setGithub(e.target.value)}/></li>
                <li>Notion : <input id="notion" type="url" value={notionUrl} placeholder='notion - url' name="notionUrl"
                               onChange={(e) => setNotion(e.target.value)} /></li>
            </ul>
            <button className="link__edit-btn" type='submit'>저장</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
  }