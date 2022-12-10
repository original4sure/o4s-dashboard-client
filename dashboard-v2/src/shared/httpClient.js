import axios from 'axios'
/** Default config for axios instance */
let config = {
    baseURL: "https://dev-2.o4s.io/gateway" + '/api/',
    withCredentials: true,
}

const httpClient = axios.create(config)

httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzA2NDU0NTksIm5iZiI6MTY3MDY0NTQ1OSwianRpIjoiYTZkMWIzMDUtZGVkYi00NmE0LThhNWEtN2Q3N2JiYTJkNTFjIiwiZXhwIjoxNjcwNjg4NjU5LCJpZGVudGl0eSI6Im5vdmEuYW5hbHlzdEBvNHMuaW8iLCJmcmVzaCI6dHJ1ZSwidHlwZSI6ImFjY2VzcyJ9.rriUeno0C3OmWIajFkTnBULlxP8fGUWrtqIQMgn1rEI'

export { httpClient }