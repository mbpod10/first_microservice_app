import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const PostCreate = () => {
  const [formTitle, setFormTitle] = useState("")

  const handleSubmit = (event) => {
    console.log("SUBMIT")
    axios.post('http://localhost:4001/posts/123/comments', {
      "content": formTitle
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
    event.preventDefault()
  }

  const handleChange = (event) => {
    setFormTitle(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input className='form-control' value={formTitle} onChange={handleChange} />
        </div>
        <button className="btn btn-primary" ha>Submit</button>
      </form>
    </div>
  )
}

export default PostCreate