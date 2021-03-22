const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const {
  PORT = 8080,
  DEFAULT_PORT = 80,
  DEFAULT_HOST = '143.198.215.23'
} = process.env

const app = express()

app.use(cors())

app.all('*', async (req, res) => {
  const { method, headers, body, url } = req
  const { port = DEFAULT_PORT, host = DEFAULT_HOST } = req.query

  try {
    console.info(`${method}: http://${host}:${port}${url}`)
    const fetchRes = await fetch(`http://${host}:${port}${url}`, {
      method,
      headers,
      body
    })

    if (fetchRes.ok) {
      fetchRes.body.pipe(res)
    } else {
      res.status(fetchRes.status).send(await fetchRes.text())
    }
  } catch (error) {
    console.info(`fetch failed: http://${host}:${port}`)
    console.error(error)
    return res.status(500).send(error.message)
  }
})

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on http://localhost:${PORT}`)
})
