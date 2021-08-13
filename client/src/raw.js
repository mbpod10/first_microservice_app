// import React from 'react'
// import axios from 'axios'
// import { useEffect, useState } from 'react'

// const PostCreate = () => {
//   const [blogData, getBlogData] = useState([])
//   useEffect(() => {
//     const makeApiCall = () => {
//       axios.get('http://localhost:4001/posts/123/comments').then(res => {
//         getBlogData(res.data)
//       })
//     }
//     makeApiCall()
//   }, [])

//   const contentArray = blogData.map((element, index) => {
//     return (
//       <div>
//         <p>ID: {element.id}</p>
//         <p>Title: {element.content}</p>
//       </div>
//     )
//   })


//   return (
//     <div>
//       <form>
//         <div className='form-group'>
//           <label>Title</label>
//           <input className='form-control' />
//         </div>
//         <button className="btn btn-primary">Submit</button>
//       </form>
//       {contentArray}
//     </div>
//   )
// }

export default PostCreate