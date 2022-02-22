const express = require('express')
const app = express()

const port = process.env.PORT || 3000;

// middleware
app.use(express.static('./public'));
app.use(express.json());


app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})