const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch');

const app = express()

app.use(cors())

app.get('/', async function (req, res) {
  fetch(req.query.url)
    .then(async ({ body, ok, status, text }) => {
      if (ok) {
        body.pipe(res);
      } else {
        res.status(status).send(await text())
      }
    })
})

app.listen(2301, function () {
  console.log('CORS-enabled web server listening on port 2301')
})