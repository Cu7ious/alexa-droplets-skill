require('dotenv').load()
const express = require('express')
const bodyParser = require('body-parser')
const verifier = require('alexa-verifier')

const verify = function (req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    return next()
  }

  if (!req.body.session || !req.body.request || !req.headers.signaturecertchainurl) {
    console.error(req.body, req.headers.signaturecertchainurl)
    return res.status(400).json({ message: 'Invalid Request Body', error: null })
  }

  verifier(req.headers.signaturecertchainurl, req.headers.signature, req.rawBody, function (err) {
    if (err) {
      console.error(err)
      res.status(401).json({ message: 'Verification Failure', error: err })
    } else {
      next()
    }
  })
}

const app = express()

const port = process.env.PORT || 3000

app.set('port', port)

app.use(express.static('public'))

app.use(bodyParser.json({
  verify: function getRawBody (req, res, buf) {
    req.rawBody = buf.toString()
  }
}))


app.get('/', (req, res) => {
  res.json({ message: 'The app is up and running.' })
})

  .post('/digitalocean', verify, () => {})

  .listen(port, () => {
    console.log('App is up and running on port %d', port)
  })
