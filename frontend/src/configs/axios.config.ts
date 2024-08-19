import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_URL_BACKEND
})

// Add a request interceptor
http.interceptors.request.use(
  config => {
    let newConfig = {
      ...config
    }

    return newConfig
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  response => {
    if (response && response.data) return response.data
    return response
  },
  err => {
    return err
  }
)
