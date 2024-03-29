import axios from 'axios'

axios.defaults.timeout = 5000 // 设置请求时间
axios.defaults.baseURL = 'http://localhost:8081' // 设置接口公共部分

// http request 拦截器

axios.interceptors.request.use(

  config => {
    config.data = JSON.stringify(config.data)

    config.headers = {

      'Content-Type': 'application/json'

    }

    return config
  },

  error => {
    return Promise.reject(err)
  }

)

// http response 拦截器

axios.interceptors.response.use(

  response => {
    if (response.status === 0) {
      router.push({

        path: '/login',

        querry: { redirect: router.currentRoute.fullPath }// 从哪个页面跳转

      })
    }

    return response
  },

  error => {
    return Promise.reject(error)
  }

)

/**

* 封装get方法

* @param url

* @param data

* @returns {Promise}

*/

export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })

      .then(response => {
        resolve(response.data)
      })

      .catch(err => {
        reject(err)
      })
  })
}

/**

* 封装post请求

* @param url

* @param data

* @returns {Promise}

*/

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**

* 封装patch请求

* @param url

* @param data

* @returns {Promise}

*/

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**

* 封装put请求

* @param url

* @param data

* @returns {Promise}

*/

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
