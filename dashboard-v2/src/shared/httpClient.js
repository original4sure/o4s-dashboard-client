import axios from 'axios'
/** Default config for axios instance */
let config = {
    baseURL: "https://dev-2.o4s.io/gateway" + '/api/',
    withCredentials: true,
}

const httpClient = axios.create(config)

httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzA5MDYzNTcsIm5iZiI6MTY3MDkwNjM1NywianRpIjoiOGIxNTliYzUtMDNiOC00YjMwLThiNzAtMmMzYTY0ZWFiZmI3IiwiZXhwIjoxNjcwOTQ5NTU3LCJpZGVudGl0eSI6Im5vdmEuYW5hbHlzdEBvNHMuaW8iLCJmcmVzaCI6dHJ1ZSwidHlwZSI6ImFjY2VzcyJ9.bO5MQmVuH9HspOylwGwKjFgEEnhrQhrIh73n7HnlH7Y'

export { httpClient }