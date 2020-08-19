const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const { PORT = 2301 } = process.env

const app = express()

app.use(cors())

app.get('/', async function (req, res) {
  console.info(req.query.url)
  fetch(req.query.url)
    .then(async ({ body, ok, status, text }) => {
      if (ok) {
        body.pipe(res);
      } else {
        res.status(status).send(await text())
      }
    })
})

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})
