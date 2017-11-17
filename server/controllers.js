const pgp = require('pg-promise')()

const dbConfig = require('./config').db
const Ctrl = {}

const db = pgp(dbConfig)

Ctrl.executeSQL = query => {
  return new Promise((resolve, reject) => {
    db
      .any(query)
      .then(data =>
        resolve({
          rowCount: data.length,
          data: data
        })
      )
      .catch(error => {
        reject(error.message)
      })
  })
}

module.exports = Ctrl
