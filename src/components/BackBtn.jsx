import React from 'react'
import './comp.css'
import { useNavigate } from 'react-router-dom'
import AuthStore from '../store/AuthStore';

export default function BackBtn({navi}) {
    const navigate = useNavigate();
  return (
    <div className='flexBtn' >
        <button id='backBtn' type='button' onClick={() => {navi ? navigate(`${navi}` , { replace: true }) : navigate(-1)}}>  ◀ Back  </button>
    </div>
  )
}
