import React from 'react'


const CommentList = ({ comments }) => {


  const commentArray = comments.map((comment, index) => {
    let content
    if (comment.status === 'accepted') {
      content = comment.content
    }
    if (comment.status === 'pending') {
      content = "This comment is awaiting moderation"
    }
    if (comment.status === 'rejected') {
      content = "REMOVED COMMENT"
    }

    return (
      <li key={comment.id}>{content}</li>
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