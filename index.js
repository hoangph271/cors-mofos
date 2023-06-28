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

  const needsBody = ['PUT'].includes(req.method)
  const bodyStr = JSON.stringify(req.body);

  const cosmosRes = await fetch(
    url,
    {
      method: req.method,
      headers: {
        ...req.headers,
        ...(needsBody && { 'Content-Length': new TextEncoder().encode(bodyStr).length })
      },
      body: needsBody ? bodyStr : undefined,
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
