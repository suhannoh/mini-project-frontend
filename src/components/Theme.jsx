import React from 'react'
import AuthStore from '../store/AuthStore'

export default function Theme() {
    const {theme , toggleTheme} = AuthStore();
    const handelToggleTheme = () => {
        toggleTheme();
    }
  return (
    <div>
        <button className={theme ? "" : "white" } onClick={handelToggleTheme}> {theme ? "🌙" : "☀️"} </button>
    </div>
  )
}
