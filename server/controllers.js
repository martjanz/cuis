const pgp = require('pg-promise')()

const Ctrl = {}

Ctrl.executeSQL = (query, dbConfig) => {
  const db = pgp(dbConfig)

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
