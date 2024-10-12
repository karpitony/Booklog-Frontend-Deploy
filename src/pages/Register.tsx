import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthHeader from '../components/auth/AuthHeader'
import AuthImg from '../assets/images/AuthImg.svg'
import RegisterForm from '../components/auth/RegisterForm'
import { useAuthStore } from '../stores/UseCurrentUserStore'

export default function Register() {
  const navigate = useNavigate()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (isLogin) {
      navigate('/')
    }
  }, [isLogin, navigate])

  return (
    <div className="h-dvh">
      <AuthHeader />
      <div className="pt-12 2xl:pt-24 py-2">
        <div className="relative flex flex-col 2xl:flex-row gap-12 2xl:gap-36 items-center justify-center">
          <img
            src={AuthImg}
            alt="AuthImg"
            className="w-40 md:w-[444px] h-24 md:h-64"
          />
          <div className="w-72 md:w-[600px] h-32 md:h-full">
            <div className="flex flex-col gap-7 md:gap-12">
              <p className="font-semibold text-3xl text-[#2B5877]">회원가입</p>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
