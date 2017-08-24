require('dotenv').load()
const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

const app = express()
app.set('port', port)

app.use(express.static('public'))
app.use(bodyParser.json({
  verify: function getRawBody (req, res, buf) {
    req.rawBody = buf.toString()
  }
}))

app.listen(port, () => {
  console.log('App is up and running on port %d', port)
})
