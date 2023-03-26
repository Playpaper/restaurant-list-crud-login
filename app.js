// require express from node_modules
const express = require('express')
const app = express()

const port = 3000

// set routes
app.get('/', (req, res) => {
  res.send(`Hello It's my restaurant web app.`)
})

// start and listen the server
app.listen(port, () => {
  console.log(`The express server is listening on http://localhost:${port}`)
})