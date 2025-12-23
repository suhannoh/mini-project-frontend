import './Post.css'
import Post from '../../components/Post'
import Layout from '../../layout/Layout'
import { useEffect, useState } from 'react'
import AuthStore from '../../store/AuthStore'
import { api } from '../../api/auth'
import { logError } from '../../components/logError'

export default function PostPage() {
  // 게시글
  const [posts, setPosts] = useState([]);
  // 검색 관련 상태
  const [radioType, setRadioType] = useState("title");
  // 뷰 관련 상태
  const [radioShowType, setRadioShowType] = useState("list");
  // 검색어 
  const [searchText, setSearchText] = useState("");
  // 테마
  const { theme } = AuthStore();

  useEffect(() => {
    // 전체 게시글 조회
    const getPosts = async () => {
      try {
        const res = await api.get(`/post`);
        // 게시글 상태 업데이트
        setPosts(res.data)
      } catch (e) {
        logError(e);
      }
    }
    // 초기 전체 게시글 로드
    getPosts();
  }, []);


  const handleSearchPost = async (e) => {
    e.preventDefault();
    // 검색 API 호출
    try {
      const res = await api.get(`/post/search`, 
                                { params: { type: radioType, text: searchText}});
      // 검색된 게시글 상태 업데이트
      setPosts(res.data);
    } catch (e) {
      logError(e);
    }
  }

  return (
    <div>
      <Layout postBtn={true} backNavi={"/main"}>
        <ul className={radioShowType === "list" ? 'post-list-ul' : 'post-card-ul'}>
          <div className='post-search'>
            <form onSubmit={handleSearchPost}>
              <h2> 검색 </h2>
              <div className='input-set'>
                <input onChange={(e) => setSearchText(e.target.value)}
                  style={{
                    border: theme ?
                      "" : "1px solid #725a5a"
                  }} className="post-search-input" type="text"
                  placeholder='검색할 내용을 입력하세요 ' />
                <button className={theme ? "" : "white"} type='submit'>🔍</button>
              </div>
              <div className='post-radios'>
                <div>
                  <label><input type='radio' name="searchPost"
                    value="title" checked={radioType === "title"}
                    onChange={(e) => setRadioType(e.target.value)} /> 제목 </label>
                  <label><input type='radio' name="searchPost"
                    value="content" checked={radioType === "content"}
                    onChange={(e) => setRadioType(e.target.value)} /> 내용 </label>
                  <label><input type='radio' name="searchPost"
                    value="author" checked={radioType === "author"}
                    onChange={(e) => setRadioType(e.target.value)} /> 작성자 </label>
                </div>
              </div>
            </form>
            <div className="view-toggle">
              <button
                className={radioShowType === "list" ? "active" : ""}
                onClick={() => setRadioShowType("list")} value="list">
                리스트
              </button>

              <button
                className={radioShowType === "card" ? "active" : ""}
                onClick={() => setRadioShowType("card")}  value="card"
              >
                카드
              </button>


              {/* <label><input type='radio' name="searchPostView"
                value="list" checked={radioShowType === "list"}
                onChange={(e) => setRadioShowType(e.target.value)} /> 리스트 </label>
              <label><input type='radio' name="searchPostView"
                value="card" checked={radioShowType === "card"}
                onChange={(e) => setRadioShowType(e.target.value)} /> 카드 </label> */}
            </div>

          </div>
          {posts.map((li, idx) => {
            return (
              <Post view={radioShowType} list={li} key={li.postId} id={li.postId} idx={idx + 1} title={li.title} content={li.content} />
            )
          })}
        </ul>
      </Layout>
    </div>
  )
}
