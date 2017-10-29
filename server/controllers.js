const pgp = require('pg-promise')()

const dbConfig = require('./config').db
const Ctrl = {}

Ctrl.executeSQL = query => {
  const db = pgp(dbConfig)

  return db.any(query).then(data => {
    return data
  })
}

module.exports = Ctrl
