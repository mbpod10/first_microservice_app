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
4. Then `http://localhost:4000/events` is triggered and then:
```js
// AFTER SENDING IN POSTS, THIS IS CALLED AFTER SEND TO EVENT-BUS
app.post('/events', (req, res) => {
  console.log('received event', req.body.type)
  res.send({})
})
```

### NOTE: the event-bus server will make calls to all microservices as in:
```js
// LOCAL HOST 4005
// `http://localhost:4005/events`

app.post('/events', (req, res) => {
  const event = req.body
  // trigger POSTS server '/events' route
  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  // trigger COMMENTS server '/events' route
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  // trigger QUERY server '/events' route
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' })
})

app.listen(4005, () => {
  console.log("Listening on 4005")
})
```