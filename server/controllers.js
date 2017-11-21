const pgp = require('pg-promise')()

const Ctrl = {}
const dbConnections = []

Ctrl.executeSQL = (query, dbConfig) => {
  // Cached db connections. Keeps only one instance for every dbConfig
  if (!dbConnections[JSON.stringify(dbConfig)]) {
    db = pgp(dbConfig)
    dbConnections[JSON.stringify(dbConfig)] = db
  } else {
    db = dbConnections[JSON.stringify(dbConfig)]
  }

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
