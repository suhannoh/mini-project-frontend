import React from 'react'

export default function Post({id, title , like=0 , content=false, view}) {
  return (
        <div className={view === "list" ? 'post' : "post-card"} >
            {view === "list" &&
            <h2 className='post-id'> {id}</h2>}
            <h2 className='post-title'> {title} </h2>
            {view === 'card' && 
            <h2> {content} </h2>}
            <h2 className='post-like'> ♥ {like} </h2>
        </div>
  )
}
