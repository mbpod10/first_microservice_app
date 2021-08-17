import React from 'react'


const CommentList = ({ comments }) => {


  const commentArray = comments.map((element, index) => {
    return (
      <li key={element.id}>{element.content}</li>
    )
  })

  return (
    <>
      <p>({comments.length}) comments</p>
      <ul>
        {comments ? commentArray : null}
      </ul>
    </>
  )
}

export default CommentList