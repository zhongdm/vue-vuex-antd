import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import router from '@/router'
const service = axios.create({
  // baseURL: ''
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code === 401) {
      router.push('/login')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service