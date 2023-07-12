const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { PORT = 2301 } = process.env

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express()

app.use(cors('*'))

app.use(bodyParser.text({ type: '*/*' }), async (req, res) => {
  const url = `https://cosmos-test.ext.np.renewables-apps.com${req.url}`

  delete req.headers.host

  const needsBody = ['PUT', 'POST'].includes(req.method)

  const cosmosRes = await fetch(
    url,
    {
      method: req.method,
      headers: {
        ...req.headers,
      },
      body: needsBody ? req.body : undefined,
    }
  )

  try {
    if (cosmosRes.status === 200) {
      res.json(await cosmosRes.json())
    } else {
      res
        .status(cosmosRes.status)
        .send(await cosmosRes.text())
    }
  } catch (error) {
    console.error(error);
    console.error(await cosmosRes.text())
  }
})

app.listen(PORT, function () {
  console.log(`Started: http://localhost:${PORT}`)
})

module.exports = app;
