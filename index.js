const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const {
  PORT = 2301,
  SERVER = 'http://127.0.0.1:8000'
} = process.env

const app = express()

app.use(cors('*'))
app.use((req, res, next) => {
  createProxyMiddleware({
    ws: true,
    target: SERVER,
    changeOrigin: true
  })(req, res, next)
})

app.listen(PORT, function () {
  console.log(`Started: http://localhost:${PORT}`)
})

module.exports = app;
