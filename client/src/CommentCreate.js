import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const CommentCreate = (props) => {
  const [commentBody, createCommentBody] = useState("")

  const handleChange = (event) => {
    console.log(event.target.value)
    createCommentBody(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.post(`http://localhost:4001/posts/${props.id}/comments`,
      { "content": commentBody }
    ).then(res => {
      console.log(res.data)
    })
    createCommentBody("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label> New Comment</label>
          <input className="form-control" value={commentBody} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" ha>Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate