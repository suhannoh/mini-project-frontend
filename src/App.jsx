
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Join from './pages/Join';
import Main from './pages/Main';
import Login from './pages/Login';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
