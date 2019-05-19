import axios from 'axios'

function fetch (url, paramsData, method = 'GET') {
  const params = method === 'GET' ? paramsData : {}
  const data =  method === 'POST' ? paramsData : {}
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method,
      params,
      data
    }).then(res => {
      if (res.code === 200) {
        resolve(res.data)
      } else {
        reject(res.errMsg || 'execute error')
      }
    }).catch(err => {
      reject(new Error('Internal Error'))
    })
  })
}

export default fetch
