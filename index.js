const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { PORT = 2301 } = process.env

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express()

app.use(cors('*'))

app.use(bodyParser.json(), async (req, res) => {
  const url = `https://cosmos.apps.res.rwe.com${req.url}`

  delete req.headers.host

  const cosmosRes = await fetch(
    url,
    {
      method: req.method,
      headers: req.headers,
      body: ['PUT'].includes(req.method) ? JSON.stringify(req.body) : undefined,
    }
  )

  if (cosmosRes.status === 200) {
    res.json(await cosmosRes.json())
  } else {
    res
      .status(cosmosRes.status)
      .send(await cosmosRes.text())
  }
})

app.listen(PORT, function () {
  console.log(`Started: http://localhost:${PORT}`)
})

module.exports = app;
