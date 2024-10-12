import axios from 'axios'
import { useAuthStore } from '../stores/UseCurrentUserStore'

const apiClient = axios.create({
  baseURL: 'https://api-booklog.ezbooks.kr/api/v1',
})

apiClient.interceptors.request.use(
  (config) => {
    if (
      config.url &&
      !config.url.includes('/login') &&
      !config.url.includes('/register') &&
      !config.url.includes('/book')
    ) {
      const { accessToken } = useAuthStore.getState()
      // console.log('Access Token:', accessToken) // 토큰 출력
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
        console.log('헤더 설정 완료')
      } else {
        console.warn('Access Token이 존재하지 않습니다.')
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
