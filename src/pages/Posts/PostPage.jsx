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
  const [anonPosts, setAnonPosts] = useState([]);

  //
  const [randomAnonPosts, setRandomAnonPosts] = useState(null);
  // 검색 관련 상태
  const [radioType, setRadioType] = useState("title");
  // 뷰 관련 상태
  const [radioShowType, setRadioShowType] = useState("list");
  // 카테고리
  const [category, setCategory] = useState("all");
  // 검색어 
  const [searchText, setSearchText] = useState("");
  // 테마
  const { theme } = AuthStore();
  // 페이지네이션 관련 상태 
  const [page, setPage] = useState(0);
  // 전체 페이지 수 상태
  const [totalPages, setTotalPages] = useState(0);
  const size = 8;
  // 검색 중 상태
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // 전체 게시글 조회
    const getPosts = async () => {
      try {
        // CARD 뷰일 때 익명 게시글 불러오기
        if (radioShowType === "card") {
          const res = await api.get(`/post/anonymous`, {
                params: {
                  category ,
                } });
            setAnonPosts(res.data); 
            setRandomAnonPosts(pickRandomPost(res.data))
            } 
        else {
        // LIST + 검색 중이 아닐 때 전체 게시글 불러오기
        if(!isSearching) {
          const res = await api.get(`/post`, { 
                params: {
                  category ,
                  page,
                  size,
                } });

            // 검색 API 호출
            setPosts(res.data.content);
            setTotalPages(res.data.totalPages);

        }
        // 검색 중일 때 검색된 게시글 불러오기
        else {
            const res = await api.get(`/post/search`, 
                          { params: {
                              type: radioType, text: searchText , category : category,
                              page, size,
                            } 
                          });
            // 검색된 게시글 상태 업데이트
            setPosts(res.data.content);
            setTotalPages(res.data.totalPages);
            }
                      
        }  

    } catch (e) {
        logError(e);
    } 
  }
    // 초기 전체 게시글 로드
    getPosts();
    // 카테고리 또는 페이지가 변경될 때마다 게시글 다시 로드
  }, [category, page , isSearching , radioShowType ]);

  
  // 검색 핸들러
  const handleSearchPost = async (e) => {
    e.preventDefault();
    setPage(0);  // 검색 시 첫 페이지로 이동
    setIsSearching(true); // 검색 중 상태로 설정
  }
  
  const pickRandomPost = (list) => {
     if (!list || list.length === 0) return null; 
     const idx = Math.floor(Math.random() * list.length); 
     return list[idx]; 
  };
  const handleRandomAnon = () => {

    setRandomAnonPosts(pickRandomPost(anonPosts));
  };
  

  return (
    <div>
      <Layout layoutType="post" postBtn={true} backNavi={"/main"}>
        <ul className={radioShowType === "list" ? 'post-list-ul' : 'post-card-ul'}>
          <div className='post-search'>
            <div className="view-toggle">
              ️{/* 카테고리 선택 버튼 */}
              <button
                className={category === "all" ? "active" : ""}
                onClick={() =>{ setCategory("all"); setPage(0); 
                  setIsSearching(false);}} value="all
                "> 전체 </button>
              <button
                className={category === "자유게시판" ? "active" : ""}
                onClick={() => {setCategory("자유게시판"); setPage(0); setIsSearching(false);}} value="자유게시판"
                > 자유게시판 </button>
              <button
                className={category === "개발정보" ? "active" : ""}
                onClick={() => { setCategory("개발정보"); setPage(0); setIsSearching(false); }}  value="개발정보"
              > 개발정보 </button>
              <button
                className={category === "질문" ? "active" : ""}
                onClick={() => { setCategory("질문"); setPage(0); setIsSearching(false); }}  value="질문"
              > 질문 </button>
            </div>

            <form onSubmit={handleSearchPost}>
              <h2> 검색 </h2>
              {/* 검색 입력 필드 */}
              <div className='input-set'>
                <input onChange={(e) => setSearchText(e.target.value)}
                  style={{
                    border: theme ?
                      "" : "1px solid #725a5a"
                  }} className="post-search-input" type="text"
                  placeholder='검색할 내용을 입력하세요 ' />
                <button className={theme ? "" : "white"} type='submit'>🔍</button>
              </div>
              {/* 검색 타입 선택 */}
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

            {/* 뷰 전환 버튼 */}
            <div className="view-toggle">
              <button
                className={radioShowType === "list" ? "active" : ""}
                onClick={() => setRadioShowType("list")} value="list"
                > 게시글 </button>

              <button
                className={radioShowType === "card" ? "active" : ""}
                onClick={() => setRadioShowType("card")}  value="card"
              > 익명카드 </button>
            </div>
          </div>

          {/* 게시글 목록 */}
          {radioShowType === "list" ?
          posts.map((li, idx) => {
            return (
              <Post view={radioShowType} list={li} key={li.postId} id={li.postId} idx={(idx + 1 ) + (page * size)}  title={li.title} content={li.content} />
            )
          }) : posts.length == 0 &&  <h2> 게시글이 없습니다. </h2> }
          {/* pagination */}
          {(page < totalPages && radioShowType === "list") && <div className="pagination">
            <button
            // 이전 버튼 비활성화 조건: 현재 페이지가 첫 페이지일 때
              disabled={page === 0}
              onClick={() => setPage(page => page - 1)}
            > 이전 </button>
           {/* 페이지 번호 표시 */}
            <span>{page + 1} / {totalPages}</span>

            <button disabled={page + 1 >= totalPages}
            // 다음 버튼 비활성화 조건: 현재 페이지가 마지막 페이지일 때
              onClick={() => setPage(page => page + 1)}
            > 다음 </button>
          </div>}




          {/* 익명 카드  */}
          { radioShowType === "card" ? (
              randomAnonPosts ? (
              <Post view={radioShowType} list={randomAnonPosts} key={randomAnonPosts.postId ?? randomAnonPosts.id} 
                    id={randomAnonPosts.postId ?? randomAnonPosts.id} 
                    title={randomAnonPosts.title} content={randomAnonPosts.content} 
                />
              ) : (
                <h2> 게시글이 없습니다. </h2> 
              )
            ) :  null}
        
        { radioShowType === "card" && (
          <button className="random-btn" onClick={handleRandomAnon}>
            🎲 다른 익명글 보기
          </button> )}

        </ul>
        
      </Layout>
    </div>
  )
}
