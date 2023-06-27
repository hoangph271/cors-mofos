const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const { PORT = 2301 } = process.env

const app = express()

app.use(cors('*'))
app.use((req, res, next) => {
  const { target } = req.query

  if (!target) return res
    .status(400)
    .send('`target` is required')

  createProxyMiddleware({
    ws: true,
    target,
    changeOrigin: true,
    secure: false,
  })(req, res, next)

  console.info(req.method)
})

app.listen(PORT, function () {
  console.log(`Started: http://localhost:${PORT}`)
})

module.exports = app;
