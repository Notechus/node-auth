// lib/app.ts
import express from 'express'
import logger from './utils/logger'
import body from 'body-parser'
import jwt from 'jsonwebtoken'
import auth from './api/authApi.js'

// Create a new express application instance
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(body.json())
app.use('/api/auth', auth)

app.listen(3000, () => {
  logger.info('Node Auth listening on port 3000!')
})
