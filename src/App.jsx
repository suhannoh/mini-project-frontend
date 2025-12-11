
import { Route, Routes } from 'react-router-dom';
import './App.css'
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/join' element={<JoinPage />} />
      </Routes>
    </>
  )
}

export default App
