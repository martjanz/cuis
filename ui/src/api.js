import axios from 'axios'

export const getData = (dbConfig, query) => {
  return axios
    .post('/api/sql?q=' + encodeURIComponent(query), dbConfig)
    .then(response => {
      return response.data
    })
}
