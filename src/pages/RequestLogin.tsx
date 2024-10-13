import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import MainPageContext from '../components/MainPage/MainPageContext'
import SampleReviewImg from '../assets/images/SampleReviewImg.svg'
import cn from '../libs/cn'
import { useAuthStore } from '../stores/UseCurrentUserStore'

export default function RequestLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLogin } = useAuthStore()

  const from = location.state?.from || '/'
  const action = location.state?.action || '작성'

  useEffect(() => {
    if (isLogin) {
      navigate(from)
    }
  }, [isLogin, from, navigate])

  const gotoLogin = () => {
    navigate('/login', { state: { from } })
  }

  return (
    <>
      <MainPageContext />
      <div className="pt-[100px] px-10 flex flex-col justify-center items-center">
        <div className={cn('w-[311px] md:w-[581px] h-[232px] md:h-[434px]')}>
          <img
            src={SampleReviewImg}
            alt="SampleReviewImg"
            className="w-[175.48px] md:w-[327px] h-[182.45px] md:h-[340px] mx-[67.76px] md:mx-auto object-contain"
          />
          <p className="text-[#4e4d4d] text-xs sm:text-2xl pt-[41.23px] sm:pt-[77px] text-center text-nowrap">
            독후감을 {action}하려면
            <span className="text-[#EC6B53]">로그인</span>
            해주세요!
          </p>
        </div>
        <button
          onClick={gotoLogin}
          className={cn(
            'mt-10 sm:mt-[100px] xl:mt-[64px] bg-[#ec6b53] rounded-lg border-none',
            'w-24 sm:w-[158px] h-8 sm:h-12'
          )}
        >
          <p className="text-[16px] sm:text-xl text-[#fafafa]">로그인</p>
        </button>
      </div>
    </>
  )
}
