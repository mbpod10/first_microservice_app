import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const CommentList = (props) => {
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    const makeApiCall = async () => {
      await axios.get(`http://localhost:4001/posts/${props.id}/comments`)
        .then(res => {
          setCommentList(res.data)
        })
    }
    makeApiCall()
  }, [props.id])

  const commentArray = commentList.map((element, index) => {
    return (
      <p>{element.content}</p>
    )
  })

  return (
    <>
      <p>Comments ({commentList.length})</p>
      {commentList ? commentArray : null}
    </>
  )
}

export default CommentList