const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { PORT = 2301 } = process.env

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express()

app.use(cors('*'))

const jsonParser = bodyParser.text({ type: 'application/json' })

function parseBodyMiddleware (req, res, next) {
  if (req.headers['content-type'] === 'application/json') {
    return jsonParser(req, res, next)
  }

  next()
}

app.use(parseBodyMiddleware, async (req, res) => {
  const url = `https://cosmos-test.ext.np.renewables-apps.com${req.url}`

  delete req.headers.host

  try {
    const cosmosRes = await fetch(
      url,
      {
        method: req.method,
        headers: {
          ...req.headers,
        },
        body: req.body,
      }
    )

    if (cosmosRes.ok) {
      res.json(await cosmosRes.json())
    } else {
      res
        .status(cosmosRes.status)
        .send(await cosmosRes.text())
    }
  } catch (error) {
    console.error(error);
  }
})

app.listen(PORT, function () {
  console.log(`Started: http://localhost:${PORT}`)
})

module.exports = app;
