import { create } from 'zustand'

interface AuthState {
  username: string
  setUsername: (username: string) => void

  accessToken: string
  setAccessToken: (accessToken: string) => void

  refreshToken: string
  setRefreshToken: (refreshToken: string) => void

  isLogin: boolean
  login: (accessToken: string) => void
  logout: () => void

  duplicatedState: boolean
  setIsDuplicated: (isDuplicated: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,

  username: '',
  setUsername: (username) => set({ username, isLogin: true }),

  accessToken: '',
  setAccessToken: (token) => set({ accessToken: token }),

  refreshToken: localStorage.getItem('refreshToken') || '',
  setRefreshToken: (refreshToken) => {
    localStorage.setItem('refreshToken', refreshToken)
    set({ refreshToken: refreshToken })
  },

  login: (accessToken: string) => {
    set({ accessToken, isLogin: true })
  },
  logout: () =>
    set({
      username: undefined,
      accessToken: undefined,
      refreshToken: undefined,
      isLogin: false,
    }),

  duplicatedState: false,
  setIsDuplicated: (isDuplicated: boolean) =>
    set({ duplicatedState: isDuplicated }),
}))
