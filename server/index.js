const Express = require('express')
const Path = require('path')
const bodyParser = require('body-parser')
const open = require('open')

const router = require('./routes')

const app = Express()

// TODO: move to config
// Default port
const config = {
  port: 4000
}

app.use(bodyParser.json()) // for parsing application/json

// Health check and API docs endpoint
app.use('/api', router)

app.use(Express.static(Path.join(__dirname, '../ui/build')))

app.use((req, res) => {
  return res.status(404).send({
    message: 'Endpoint not found. What are you looking for here?'
  })
})

app.listen(config.port, onListen)

if (process.env.OPEN_BROWSER) open('http://localhost:' + config.port)

function onListen() {
  console.log(
    `Application Server listening on port ${config.port} (PID ${process.id})`
  )
}

module.exports = app
