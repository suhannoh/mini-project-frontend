import React from 'react'
import BackBtn from '../../components/BackBtn'
import LogoutBtn from '../../components/LogoutBtn'
import './Post.css'
import Post from '../../components/Post'
import Layout from '../../layout/Layout'

export default function PostPage() {
  const list = [
  {
    id : 1,
    title : "test title",
    content : "test content"
  },
  {
    id : 2,
    title : "test title",
    content : "test content"
  },
  {
    id : 3,
    title : "test title",
    content : "test content"
  },
  {
    id : 4,
    title : "test title",
    content : "test content"
  },{
    id : 5,
    title : "test title",
    content : "test content"
  },{
    id : 6,
    title : "test title",
    content : "test content"
  },{
    id : 7,
    title : "test title",
    content : "test content"
  },{
    id : 8,
    title : "test title",
    content : "test content"
  },{
    id : 9,
    title : "test title",
    content : "test content"
  },{
    id : 10,
    title : "test title",
    content : "test content"
  },{
    id : 11,
    title : "test title",
    content : "test content"
  },{
    id : 12,
    title : "test title",
    content : "test content"
  },{
    id : 13,
    title : "test title",
    content : "test content"
  },

]
  return (
    <div>
      <Layout>
        <ul className='post-list'>
          {list.map(li => (
          <Post key={li.id} id={li.id} title={li.title} content={li.content}/>
            ))}
        </ul>
      </Layout>
    </div>
  )
}
