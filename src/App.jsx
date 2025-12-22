
import { Route, Routes } from 'react-router-dom';
import './App.css'
import JoinPage from './pages/Auth/JoinPage';
import LoginPage from './pages/Auth/LoginPage';
import LinksPage from './pages/Links/LinksPage';
import Private from './pages/Auth/Private';
import MainPage from './pages/Main/MainPage';
import PostPage from './pages/Posts/PostPage';
import MyPage from './pages/My/MyPage';
import LinkAddPage from './pages/Links/LinkAddPage';
import MyEditPage from './pages/My/MyEditPage';
import AuthStore from './store/AuthStore';
import { useEffect } from 'react';
import PostAddPage from './pages/Posts/PostAddPage';
import PostDetailPage from './pages/Posts/PostDetailPage';
import Tools from './pages/Tools/Tools';
import ToolsDetail from './pages/Tools/ToolsDetail';
import { api } from './api/auth';

function App() {

  const { login , theme , logout} = AuthStore(); // theme: true/false 또는 'dark'/'light'

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "dark" : "light"
    );
  }, [theme]);

  useEffect(() => {
    try { 

    const {data} = api.get("/user/me");
    login(data);
    console.log("자동 로그인 처리");
    } catch {
      logout();
      console.log("자동 로그아웃 처리");
    }
  },[]);

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route element={<Private />}>
          <Route path='/main' element={<MainPage />} />
          <Route path='/links' element={<LinksPage/>} />
          <Route path='/links/new' element={<LinkAddPage />} />
          <Route path='/posts' element={<PostPage />} />
          <Route path='/posts/new' element={<PostAddPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path='/mini-tools' element={<Tools />} />
          <Route path="/tools/:type" element={<ToolsDetail/>} />
          <Route path='/my' element={<MyPage />} />
          <Route path="/my/edit" element={<MyEditPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
