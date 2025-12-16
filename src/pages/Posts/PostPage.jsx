import BackBtn from '../../components/BackBtn'
import LogoutBtn from '../../components/LogoutBtn'
import './Post.css'
import Post from '../../components/Post'
import Layout from '../../layout/Layout'
import { useEffect, useState } from 'react'
import AuthStore from '../../store/AuthStore'
import axios from 'axios'
import { API_BASE } from '../../config/env'

export default function PostPage() {

//   const list = [
//   {
//     id : 1,
//     title : "test title",
//     content : "test content test content test content test content test content test content test content"+  
//               "test content test content test content test content test content test content test content test content test content test content test content test content test content test content test content "
//   },
//   {
//     id : 2,
//     title : "test title",
//     content : "test content"
//   },
//   {
//     id : 3,
//     title : "test title",
//     content : "test content"
//   },
//   {
//     id : 4,
//     title : "test title",
//     content : "test content"
//   },
//   {
//     id : 5,
//     title : "test title",
//     content : "test content"
//   },
//   {
//     id : 6,
//     title : "test title",
//     content : "test content"
//   },
//   {
//     id : 7,
//     title : "test title",
//     content : "test content"
//   },  
// ] 
  const [posts , setPosts] = useState([]);
  const [radioType, setRadioType] = useState("title");
  const [radioShowType, setRadioShowType] = useState("list");
  const { theme } = AuthStore();

  useEffect(()=> {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/posts`);
        setPosts(res.data)
      } catch (e) {
          console.log(e);
      }
    }
    getPosts();
  }, []);


  const handleSearchPost = (e) => {
    e.preventDefault();
  }
  return (
    <div>
      <Layout postBtn={true}>
        <ul className={radioShowType === "list" ? 'post-list-ul' : 'post-card-ul'}>
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
          {posts.map((li,idx) => {
            console.log(li); 
            return (
          <Post view={radioShowType} key={li.postId} id={idx+1} title={li.title} content={li.content}/>
            )})}
        </ul>
      </Layout>
    </div>
  )
}
