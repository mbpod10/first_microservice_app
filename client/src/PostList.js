import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'

const PostList = () => {

  const [postList, createPostList] = useState({})

  useEffect(() => {
    const makeApiCall = async () => {
      await axios.get('http://localhost:4000/posts').then(res => {
        // console.log(res.data)
        createPostList(res.data)
      })
    }
    makeApiCall()
  }, [])
  console.log(postList)

  const postListArray = Object.keys(postList).map((element, index) => {
    return (
      <>
        <h3>Title: {postList[element].title}</h3>
        <p>ID: {postList[element].id}</p>
      </>
    )
  })

  return (
    <>
      {postListArray}
    </>
  )
}

export default PostList