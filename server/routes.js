const Express = require('express')

const Ctrl = require('./controllers')

const Router = Express.Router()

// Dumb plain text endpoint
Router.get('/heartbeat', (req, res) => {
  res.json({
    message: `I'm alive! And I suppose you too, so... let's celebrate! ;)`
  })
})

Router.post('/sql', (req, res) => {
  console.log('req', req.body)
  if (typeof req.query.q === 'undefined' || typeof req.body === 'undefined')
    return res.status(400).json({ message: 'Missing parameters.' })

  Ctrl.executeSQL(req.query.q, req.body)
    .then(result => res.json(result))
    .catch(error =>
      res.status(400).send({ message: 'SQL error: ' + error, sql: req.query.q })
    )
})

module.exports = Router
