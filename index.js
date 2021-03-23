const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const { PORT = 2301 } = process.env

const app = express()

app.use(cors())

app.get('/', async function (req, res) {
  const { url } = req.query

  if (url) {
    const { body, ok, status, text } = await fetch(url)

    if (ok) {
      body.pipe(res);
    } else {
      res.status(status).send(await text())
    }
  } else {
    res.sendStatus(200)
  }
})

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})
