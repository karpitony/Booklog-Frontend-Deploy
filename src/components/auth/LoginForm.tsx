import { useForm } from 'react-hook-form'
import LoginInput from './LoginInput'
import AuthBtn from './AuthBtn'
import { AuthCredentials } from '../../model/AuthCredentials'
import User from '../../assets/icons/User.svg'
import Lock from '../../assets/icons/Lock.svg'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '../../services/AuthService'
import { LoginRequest } from '../../model/LoginRequest'
import { useAuthStore } from '../../stores/UseCurrentUserStore'

export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUsername, setAccessToken, setRefreshToken } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>()

  const toLoginRequest = (data: AuthCredentials): LoginRequest => {
    return {
      id: data.username,
      password: data.password,
    }
  }

  const onSubmit = async (data: AuthCredentials) => {
    const loginRequestData = toLoginRequest(data)
    const from = location.state?.from || '/'

    try {
      const response = await login(loginRequestData)
      setAccessToken(response.accessToken)
      setRefreshToken(response.refreshToken)
      setUsername(loginRequestData.id)
      navigate(from)
    } catch (error) {
      console.error('로그인 에러:', error)
    }
  }

  return (
    <div className="flex flex-col md:gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-7 gap-2">
          <LoginInput
            icon={User}
            placeholder="아이디를 입력해 주세요"
            register={register}
            name="username"
            required
          />
          <LoginInput
            icon={Lock}
            placeholder="영문+숫자 8자리 이상의 비밀번호를 입력해 주세요"
            register={register}
            name="password"
            required
          />
          <div className="h-6">
            {(errors.username || errors.password) && (
              <p className="text-xs text-[#ec6b53]">
                아이디 또는 비밀번호를 다시 확인하세요
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <AuthBtn name="로그인" type="submit" />
          <AuthBtn
            name="회원가입"
            type="button"
            onClick={() => navigate('/register')}
          />
        </div>
      </form>
    </div>
  )
}
