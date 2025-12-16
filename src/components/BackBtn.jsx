import React from 'react'
import './comp.css'
import { useNavigate } from 'react-router-dom'
import AuthStore from '../store/AuthStore';

export default function BackBtn({navi}) {
    const navigate = useNavigate();
    const {theme} = AuthStore();
  return (
    <div className='flexBtn' >
        <button id='backBtn' className={theme ? "" : "white" } type='button' onClick={() => {navi ? navigate(`${navi}` , { replace: true }) : navigate(-1)}}>  ◀ Back  </button>
    </div>
  )
}
