import axios from 'axios'
import useCurrentUserState from '../stores/UseCurrentUserStore'

const apiClient = axios.create({
  baseURL: 'http://58.238.255.245:8080/api/v1',
})

apiClient.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('/login') && !config.url?.includes('/register')) {
      const { accessToken } = useCurrentUserState.getState()
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
