import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PiSignIn, PiSignOut } from 'react-icons/pi'
import cn from '../../../libs/cn.ts'
import { useAuthStore } from '../../../stores/UseCurrentUserStore.ts'

interface HeaderProps {
  isBordered?: boolean
}

export default function Header({ isBordered }: HeaderProps) {
  const navigate = useNavigate()
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleUserNameClick = () => {
    if (window.innerWidth >= 768) {
      // PC 환경
      navigate('/mypage')
    } else {
      // 모바일 환경
      setDropdownOpen(!isDropdownOpen)
    }
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleWriteClick = () => {
    navigate('/editor')
  }

  const { isLogin, username, logout } = useAuthStore()

  return (
    <header
      className={cn(
        'bg-[#2B5877] text-white p-5 ',
        `${isBordered ? 'fixed w-full rounded-b-3xl z-50' : 'pb-7'}`
      )}
    >
      <div className="flex justify-between mx-0 md:mx-20">
        <h1
          onClick={handleLogoClick}
          className="text-3xl font-rockwell font-normal cursor-pointer select-none"
          style={{ letterSpacing: '0.1em' }}
        >
          Booklog
        </h1>
        {isLogin ? (
          <div className="relative">
            <span
              onClick={handleUserNameClick}
              className="mr-4 md:mr-14 text-base md:text-xl cursor-pointer"
            >
              {username} 님
            </span>
            {/* 드롭다운 메뉴 - 모바일에서만 표시 */}
            {isDropdownOpen && (
              <div
                className={cn(
                  'absolute right-0 mt-2 w-24 bg-white text-black rounded-lg',
                  'shadow-md md:hidden text-center text-sm z-50'
                )}
              >
                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    navigate('/mypage')
                  }}
                  className="block w-full px-4 py-2"
                >
                  내 블로그
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    handleWriteClick()
                  }}
                  className="block w-full px-4 py-2"
                >
                  글쓰기
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    logout()
                  }}
                  className="block w-full px-4 py-2"
                >
                  로그아웃
                </button>
              </div>
            )}
            <button
              onClick={logout}
              className={cn(
                'bg-white px-3 md:px-4 py-2 rounded-lg text-[#EC6B53] font-bold hidden md:inline-block'
              )}
            >
              <PiSignOut className="text-base md:text-2xl inline" />
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-white px-4 py-2 rounded-lg text-[#EC6B53] font-bold"
          >
            <PiSignIn className="text-base md:text-2xl inline" />
            로그인
          </button>
        )}
      </div>
    </header>
  )
}
