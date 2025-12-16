import React from 'react'

export default function Post({id, title , like=0 , view}) {
  return (
        <div className={view === "list" ? 'post' : "post-card"} >
            <h2 className='post-card-id'> {id}</h2>
            <h2 className='post-title'> {title} </h2>
            <h2 className='post-like'> ♥ {like} </h2>
        </div>
  )
}
