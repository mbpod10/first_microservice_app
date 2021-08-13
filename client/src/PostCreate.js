import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const PostCreate = () => {
  const [formTitle, setFormTitle] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("SUBMIT")
    await axios.post('http://localhost:4000/posts', {
      "title": formTitle
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
    setFormTitle("")
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
          {/* <input className='form-control' value={formTitle} onChange={e => handleChange(e.target.value)} /> */}
        </div>
        <button className="btn btn-primary" ha>Submit</button>
      </form>
    </div>
  )
}

export default PostCreate