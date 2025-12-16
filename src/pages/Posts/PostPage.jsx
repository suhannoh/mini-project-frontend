import BackBtn from '../../components/BackBtn'
import LogoutBtn from '../../components/LogoutBtn'
import './Post.css'
import Post from '../../components/Post'
import Layout from '../../layout/Layout'
import { useState } from 'react'
import AuthStore from '../../store/AuthStore'

export default function PostPage() {

  const list = [
  {
    id : 1,
    title : "test title",
    content : "test content"
  },
  {
    id : 2,
    title : "test title",
    content : "test content"
  },
  {
    id : 3,
    title : "test title",
    content : "test content"
  },  
] 
  const [radioType, setRadioType] = useState("title");
  const [radioShowType, setRadioShowType] = useState("list");
  const { theme } = AuthStore();
  const handleSearchPost = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <Layout postBtn={true}>
        <ul className='post-list'>
          <div className='post-search'>
            <form onSubmit={handleSearchPost}>
              <h2> 검색 </h2>
              <div className='input-set'>
              <input style={{border : theme ? 
                                      "" : "1px solid #725a5a"
              }} className="post-search-input" type="text"
                      placeholder='검색할 내용을 입력하세요 '/>
              <button className={theme ? "" : "white"}type='submit'>🔍</button>
              </div>
              <div className='post-radios'>
                <div>
                  <label><input type='radio' name="searchPost" 
                                value="title" checked={radioType === "title"} 
                                onChange={(e) => setRadioType(e.target.value)}/> 제목 </label>
                  <label><input type='radio' name="searchPost" 
                                value="content" checked={radioType === "content"}
                                onChange={(e) => setRadioType(e.target.value)}/> 내용 </label>
                  <label><input type='radio' name="searchPost" 
                                value="user_name" checked={radioType === "user_name"}
                                onChange={(e) => setRadioType(e.target.value)}/> 작성자 </label>
                </div>
              </div>
            </form>
                <div>
                  <label><input type='radio' name="searchPostView" 
                                value="list" checked={radioShowType === "list"}
                                onChange={(e) => setRadioShowType(e.target.value)}/> 리스트 </label>
                  <label><input type='radio' name="searchPostView" 
                                value="card" checked={radioShowType === "card"}
                                onChange={(e) => setRadioShowType(e.target.value)}/> 카드 </label>            
                </div>

        </div>
          {list.map(li => (
          <Post key={li.id} id={li.id} title={li.title} content={li.content}/>
            ))}
        </ul>
      </Layout>
    </div>
  )
}
