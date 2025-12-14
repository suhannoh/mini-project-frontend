
import { Route, Routes } from 'react-router-dom';
import './App.css'
import JoinPage from './pages/Auth/JoinPage';
import LoginPage from './pages/Auth/LoginPage';
import LinksPage from './pages/Links/LinksPage';
import Private from './pages/Auth/Private';
import MainPage from './pages/Main/MainPage';
import PostPage from './pages/Posts/PostPage';
import MyPage from './pages/My/MyPage';
import DummyApiPage from './pages/Dummy/dummyApiPage';
import LinkAddPage from './pages/Links/LinkAddPage';
import MyEditPage from './pages/My/MyEditPage';

function App() {

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
          <Route path='/dummy' element={<DummyApiPage />} />
          <Route path='/my' element={<MyPage />} />
          <Route path="/my/edit" element={<MyEditPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
