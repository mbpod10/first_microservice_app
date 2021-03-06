import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {

  const [postList, createPostList] = useState({})

  useEffect(() => {
    const makeApiCall = async () => {
      await axios.get('http://localhost:4002/posts').then(res => {
        createPostList(res.data)
      })
    }
    makeApiCall()
  }, [])


  const postListArray = Object.values(postList).map((element, index) => {
    console.log(element)
    return (
      <div key={element} className="card" style={{ width: '30%', marginBottom: '20px' }}>
        <div className='card-body'>
          <h3>{element.title}</h3>
          <CommentList comments={element.comments} />
          <hr />
          <CommentCreate id={element.id} />
        </div>
      </div>
    )
  })

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {postListArray}
    </div>
  )
}

export default PostList