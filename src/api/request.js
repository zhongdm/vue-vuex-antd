import axios from 'axios'

const service = axios.create({
  baseURL: ''
})

// request拦截器
service.interceptors.request.use(
  config => {

  },
  error => {
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {

  },
  error => {
    return Promise.reject(error)
  }
)

export default service