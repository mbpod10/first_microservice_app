# The Microservice
- We will use an event bus and a query server
  
| Servers            |       Local Host        |                                          Function |
| ------------------ | :---------------------: | ------------------------------------------------: |
| react app          | `http://localhost:3000` |                                Client-side server |
| POSTS              | `http://localhost:4000` |  POST posts to server, communicate with event bus |
| COMMENTS           | `http://localhost:4001` |                        POST comments to event bus |
| QUERY              | `http://localhost:4002` |         sole service for GET requests client side |
| COMMENT MODERATION | `http://localhost:4003` |            moderate comments for certain language |
| N/A                | `http://localhost:4004` |                                             $1600 |
| EVENT BUS          | `http://localhost:4005` | broker between all servers when requests are made |

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
5. Now we have the ability to fetch data from the `QUERY SERVICE` and display it in our React app without needing to make GET requests to our `/posts` and `/comments` servers. We just make one request to `'http://localhost:4002/posts'` which is our `query service`. (the `query service` endpoint `/posts` just send the whole `posts` object to the client) We can now kill both the `/posts` and `/comments` servers and still be able to make GET requests and retrieve the posts and comments data. <e>However, we cannot make post requests! </e>
  
## Filter and Moderate Comments
- make a new service