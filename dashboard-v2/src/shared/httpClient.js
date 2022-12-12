import axios from 'axios'
/** Default config for axios instance */
let config = {
    baseURL: "https://dev-2.o4s.io/gateway" + '/api/',
    withCredentials: true,
}

const httpClient = axios.create(config)

httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzA4MjMxNTMsIm5iZiI6MTY3MDgyMzE1MywianRpIjoiZDU5ZWI5ZWEtYTBlZi00NDEzLTgwNjYtM2Q5MzIyMzUzMzQ4IiwiZXhwIjoxNjcwODY2MzUzLCJpZGVudGl0eSI6Im5vdmEuYW5hbHlzdEBvNHMuaW8iLCJmcmVzaCI6dHJ1ZSwidHlwZSI6ImFjY2VzcyJ9.Fh2C7qkToCzaRe1UaZPUGYnk2Zc67ZHNhj1niP37eqU'

export { httpClient }