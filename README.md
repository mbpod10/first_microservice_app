# FIRST MICROSERVICE APP

`npx create-react-app {client}`

`npm init -y`

`npm install nodemon axios cors express`

client = react
comments = node
posts = node

`package.json`: replace default with `"start": "nodemon index.js"`
```json
{
  "name": "posts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.21.1",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "nodemon": "^2.0.12"
  }
}
```

## Test Posts Request
  `localhost:4000/posts`
PostMan `post` request -- RAW
```json
{
    "title": "First Post"
}
```
RESPONSE:
```json
{
    "id": "35869e94",
    "title": "First Post"
}
```
