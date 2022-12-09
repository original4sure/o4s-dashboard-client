import axios from 'axios'
/** Default config for axios instance */
let config = {
    baseURL: "https://dev-2.o4s.io/gateway" + '/api/',
    withCredentials: true,
}

const httpClient = axios.create(config)

httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzA1NzcwMzgsIm5iZiI6MTY3MDU3NzAzOCwianRpIjoiNmQ3NTJlZmQtMzg4NC00MmMzLTk0NzktODZmOTMyZGVkMTE3IiwiZXhwIjoxNjcwNjIwMjM4LCJpZGVudGl0eSI6Im5vdmEuYW5hbHlzdEBvNHMuaW8iLCJmcmVzaCI6dHJ1ZSwidHlwZSI6ImFjY2VzcyJ9.2HjqF7DsekMUlEuyduh4P4OEPijaR4oh77JR13NgdVs'

// const authInterceptor = config => {
//     //config.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token
//     config.headers.common['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzA1NzU0MDksIm5iZiI6MTY3MDU3NTQwOSwianRpIjoiOGJkOWVhMzYtNjBjMi00NGYzLThlZTQtNjZiZDVlZThmN2E2IiwiZXhwIjoxNjcwNjE4NjA5LCJpZGVudGl0eSI6InRlc3RAbzRzLmlvIiwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MifQ.IG6g0_rqE9LHHexQFLlQIWtnAs_Ymjv0jTlxaBQfqRg'
//     return config
// }

// console.log(authInterceptor)

// /** Adding the request interceptors */
// httpClient.interceptors.request.use(authInterceptor)
// httpClient.defaults.withCredentials = true

export { httpClient }