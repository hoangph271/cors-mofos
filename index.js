const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const {
  PORT = 2301,
  SERVER_IP = '127.0.0.1'
} = process.env

const app = express()

app.use(cors())
app.use('/:port/', (req, res, next) => {
  if (!Number.parseInt(req.params.port, 10)) {
    return res.status(400).send('Invalid PORT number')
  }

  createProxyMiddleware({
    target: `http://${SERVER_IP}:${req.params.port}`,
    changeOrigin: true
  })(req, res, next)
})

app.listen(PORT, function () {
  console.log(`Started: http://localhost:${PORT}`)
})
