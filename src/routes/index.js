const express = require('express')
const router = express.Router()
const verify = require('../middleware/aws-verify')

router
  .get('/', (req, res) => {
    res.json({ message: 'The app is up and running.' })
  })
  .post('/digitalocean', verify, () => {})
