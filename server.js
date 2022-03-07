//import necessary packages
require('dotenv').config();

const express = require('express')
const app = express()
const router = require('./routes/home')
const notFoundMiddleware = require('./middleware/notFound')
const port = process.env.PORT || 3000;

//middle ware
app.use(express.static('./public'))
app.use(express.json())
app.use(router)
app.use(notFoundMiddleware)

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})