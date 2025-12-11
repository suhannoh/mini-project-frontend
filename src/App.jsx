
import { Route, Routes } from 'react-router-dom';
import './App.css'
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import LinksPage from './pages/LinksPage';
import LinkAddPage from './pages/LinkaddPage';
import Private from './pages/Private';
import MainPage from './pages/mainpage';

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
        </Route>
      </Routes>
    </>
  )
}

export default App
