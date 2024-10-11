import { create } from 'zustand'

interface UserState {
  username: string
  accessToken: string
  setUsername: (username: string) => void
  setAccessToken: (accessToken: string) => void
}

const useCurrentUserState = create<UserState>((set) => ({
  username: '',
  accessToken: '',
  setUsername: (newUsername) => set({ username: newUsername }),
  setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
}))

export default useCurrentUserState
