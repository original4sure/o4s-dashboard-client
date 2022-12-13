import axios from 'axios'
/** Default config for axios instance */
let config = {
    baseURL: "https://dev-2.o4s.io/gateway" + '/api/',
    withCredentials: true,
}

const httpClient = axios.create(config)

httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzA5MDc5MjYsIm5iZiI6MTY3MDkwNzkyNiwianRpIjoiYmRlMTRkYmQtMzE0Ni00OGUwLWE4MjMtMzJjNmEyODM1ZDY5IiwiZXhwIjoxNjcwOTUxMTI2LCJpZGVudGl0eSI6Im5vdmEuYW5hbHlzdEBvNHMuaW8iLCJmcmVzaCI6dHJ1ZSwidHlwZSI6ImFjY2VzcyJ9.pVCaj1O2T3GOiZifmJ90yMiv5v4ldJYrWcqPcAFlHbQ'

export { httpClient }