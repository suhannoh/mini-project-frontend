import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter basename="/mini-project-frontend/"> */}
    <HashRouter>
        <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </StrictMode>,
)
