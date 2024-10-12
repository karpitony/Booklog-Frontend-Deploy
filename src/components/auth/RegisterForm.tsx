import { useNavigate } from 'react-router-dom'
import AuthBtn from './AuthBtn'
import { useAuthStore } from '../../stores/UseCurrentUserStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../../validation/RegisterSchema'
import RegisterInput from './RegisterInput'
import Back from '../../assets/icons/BackForRegister.svg'
import { AuthCredentials } from '../../model/AuthCredentials'
import { signUp } from '../../services/AuthService'
import { AuthRequest } from '../../model/AuthRequest'

export default function RegisterForm() {
  const navigate = useNavigate()
  const { duplicatedState } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthCredentials>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  })

  const watchedUsername = watch('username')
  const watchedPassword = watch('password')
  const watchedConfirmPassword = watch('confirmPassword')

  const gotoLogin = () => {
    return navigate('/login')
  }

  const toAuthRequest = (data: AuthCredentials): AuthRequest => {
    return {
      id: data.username,
      name: data.username,
      password: data.password,
    }
  }

  const onSubmit = async (data: AuthCredentials) => {
    const authRequestData = toAuthRequest(data)

    try {
      if (!duplicatedState) {
        const response = await signUp(authRequestData)
        console.log('회원가입 응답:', response)
        navigate('/login')
      } else {
        alert('이미 존재하는 아이디입니다.')
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error)
    }
  }

  return (
    <div className="flex flex-col md:gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-8">
          <RegisterInput
            placeholder="아이디를 입력해 주세요"
            register={register}
            name="username"
            required
            isValid={!!watchedUsername && !errors.username}
          />
          <li
            className={`ml-28 text-xs ${
              !errors.username && watchedUsername
                ? 'text-[#2b5877]'
                : 'text-[#918f8f]'
            }`}
          >
            4-16자의 영문 소문자 혹은 영문+숫자를 입력해 주세요.
          </li>
          <div className="ml-28 h-4">
            {duplicatedState && (
              <li className="text-xs text-[#ec6b53]">
                이미 존재하는 아이디입니다.
              </li>
            )}
          </div>
          <RegisterInput
            placeholder="비밀번호를 입력해 주세요"
            register={register}
            name="password"
            required
          />
          <li
            className={`ml-28 text-xs ${
              !errors.password && watchedPassword
                ? 'text-[#2b5877]'
                : 'text-[#918f8f]'
            }`}
          >
            영문+숫자 8자리 이상의 비밀번호를 입력해 주세요.
          </li>
          <div className="ml-28 h-4"></div>
          <RegisterInput
            placeholder="비밀번호 확인을 입력해 주세요"
            register={register}
            name="confirmPassword"
            required
          />
          <div className="ml-28 h-4">
            {watchedPassword !== watchedConfirmPassword && (
              <li className="text-xs text-[#ec6b53]">
                비밀번호가 일치하지 않습니다.
              </li>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <AuthBtn type="submit" name="회원가입" />
          <button
            type="button"
            onClick={gotoLogin}
            className="flex flex-row w-20 h-fit mb-4 gap-2 items-center"
          >
            <img src={Back} alt="BackIcon" className="w-5 h-5" />
            <p className="text-sm text-nowrap">돌아가기</p>
          </button>
        </div>
      </form>
    </div>
  )
}
