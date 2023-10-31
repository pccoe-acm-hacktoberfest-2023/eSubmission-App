const express = require('express')
const connectToMongo = require('./database/connection')
const app = express()
const port = 3000

connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello Gautam!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})