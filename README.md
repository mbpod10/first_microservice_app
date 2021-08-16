# The Microservice
- We will use an event bus and a query server

## Data Cycle

1. React server gets data and sends data to `localhost/posts` server
2. In `localhost/posts` `POST` route, another API call is sent to `EVENT BUS` (4005)
```js
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
```
3. In the `EVENT BUS` router, the route is triggered and the `EVENT BUS` triggers another call to the previous router `http://localhost:4000/events`:
```js
// DATA SENT IS BY REQ.BODY
app.post('/events', (req, res) => {
  const event = req.body

  //SEND TO http://localhost:4000/events ROUTE
  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' })
})
```