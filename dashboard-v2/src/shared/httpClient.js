import axios from 'axios'
/** Default config for axios instance */
let config = {
    baseURL: "https://dev-2.o4s.io/gateway" + '/api/',
    withCredentials: true,
}

const httpClient = axios.create(config)

httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzA3Mzg0NDMsIm5iZiI6MTY3MDczODQ0MywianRpIjoiZmIyZDA5ZTAtYTZjYi00NTdlLTg4NGUtZjdlNzkyZjZlNWE3IiwiZXhwIjoxNjcwNzgxNjQzLCJpZGVudGl0eSI6Im5vdmEuYW5hbHlzdEBvNHMuaW8iLCJmcmVzaCI6dHJ1ZSwidHlwZSI6ImFjY2VzcyJ9.Z366l97XILa_SvKhrfbTlo-lgvkjGG0XtLMEFBOvTak'

export { httpClient }