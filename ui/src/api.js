import axios from 'axios'

export const getData = (dbConfig, query) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/sql?q=' + encodeURIComponent(query), dbConfig)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error.response.data.message))
  })
}
