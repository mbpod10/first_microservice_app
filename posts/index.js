const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id, title
  }

  // SEND REQUEST TO EVENT BUS AFTER SENDING TO '/posts'
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id, title
    }
  })

  res.status(201).send(posts[id])
})

// AFTER SENDING IN POSTS, THIS IS CALLED AFTER SEND TO EVENT-BUS
app.post('/events', (req, res) => {
  console.log('received event', req.body.type)
  res.send({})
})

app.listen(4000, () => {
  console.log('LISTENING ON PORT: 4000')
})