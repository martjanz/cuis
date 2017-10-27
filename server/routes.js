const Express = require('express')

const router = Express.Router()

// Dumb plain text endpoint
router.get('/heartbeat', (req, res) => {
  res.json({
    message: `I'm alive! And I suppose you too, so... let's celebrate! ;)`
  })
})

module.exports = router
