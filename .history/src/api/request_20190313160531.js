import axios from 'axios'

const service = axios.create({
  baseURL: ''
})

// request拦截器
service.interceptors.request.use(config => {

})

// response拦截器
service.interceptors.response.use(response => {

})

export default service