const express = require('express')
const cors = require('cors')
const connectToMongo = require('./database/connection')

const app = express()
app.use(cors())
app.use(express.json())
const port = 3000

connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello Gautam!')
})

app.use("/auth",require("./routes/auth"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})