import axios from 'axios'

export const getData = query => {
  return axios.get('/api/sql?q=' + encodeURIComponent(query)).then(response => {
    return response.data
  })
}
