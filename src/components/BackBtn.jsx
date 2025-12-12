import React from 'react'
import './comp.css'
import { useNavigate } from 'react-router-dom'

export default function BackBtn() {
    const navigate = useNavigate();
  return (
    <div>
        <button id='backBtn' type='button' onClick={() => {navigate(-1)}}>  ◀ Back  </button>
    </div>
  )
}
