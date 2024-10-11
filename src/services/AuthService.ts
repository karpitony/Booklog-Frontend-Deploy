import { AuthCredentials } from '../model/AuthCredentials'
import { AuthRequest } from '../model/AuthRequest'
import { AuthResponse } from '../model/AuthResponse'
import apiClient from '../config/ApiClient'

export const signUp = (user: AuthRequest) => {
  return apiClient.post<AuthResponse>('/users/signup', user)
}

export const login = async (data: AuthCredentials): Promise<string> => {
  // 추후 로그인 로직 추가 예정
  console.log('로그인 요청:', data)

  // 예시 더미 토큰
  const dummyToken = 'dummy-token'
  return Promise.resolve(dummyToken)
}

export const checkDuplicateId = async (username: string) => {
  // 추후 중복검사 로직 추가 예정
  console.log('중복검사 중인 아이디:', username)
  // 임시 아이디
  const isExists = username === 'user1'
  return isExists
}
