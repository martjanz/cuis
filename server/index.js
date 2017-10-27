const Express = require('express')
const Path = require('path')

const router = require('./routes')

const app = Express()

// TODO: move to config
const config = {
  port: 4000
}

// Health check and API docs endpoint
app.use('/api', router)

app.use(Express.static(Path.join(__dirname, '../ui/build')))

app.use((req, res) => {
  return res.status(404).send({
    message: 'Endpoint not found. What are you looking for here?'
  })
})

app.listen(config.port, onListen)

function onListen() {
  console.log(
    `Application Server listening on port ${config.port} (PID ${process.id})`
  )
}

module.exports = app
