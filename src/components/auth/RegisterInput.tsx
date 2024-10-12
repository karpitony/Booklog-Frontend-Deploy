import { UseFormRegister } from 'react-hook-form'
import { UseDuplicatCheck } from '../../hooks/UseDuplicateCheck'

interface RegisterInputProps {
  placeholder: string
  register: UseFormRegister<any>
  name: 'username' | 'password' | 'confirmPassword'
  required?: boolean
  isValid?: boolean
}

export default function RegisterInput({
  placeholder,
  name,
  register,
  required,
  isValid,
}: RegisterInputProps) {
  const { handleDuplicateCheck } = UseDuplicatCheck()

  const handleCheckClick = () => {
    const inputElement = document.getElementsByName(name)[0] as HTMLInputElement
    const username = inputElement.value
    console.log(username)
    if (!username) {
      alert('아이디를 입력하세요.')
      return
    }
    handleDuplicateCheck(username)
  }

  return (
    <div
      className={`flex flex-row ${
        name === 'username'
          ? 'gap-16'
          : name === 'confirmPassword'
            ? 'gap-3'
            : 'gap-12'
      }`}
    >
      <p className="py-5 text-lg text-nowrap">
        {name === 'username'
          ? '아이디'
          : name === 'confirmPassword'
            ? '비밀번호 확인'
            : '비밀번호'}
      </p>
      <div className="flex flex-row items-center border-b-[1px] border-b-[#918f8f] w-full">
        <input
          type={`${name === 'username' ? 'text' : 'password'}`}
          placeholder={placeholder}
          className="w-full px-3 placeholder-[#918f8f] focus:outline-none"
          {...register(name, { required })}
        />
        {name === 'username' && (
          <button
            type="button"
            className={`w-20 h-8 items-center bg-[#2B5877] hover:bg-opacity-70 rounded-lg text-xs text-[#fafafa] text-nowrap ${isValid ? '' : 'opacity-50 cursor-not-allowed'}`}
            onClick={isValid ? handleCheckClick : undefined}
            disabled={!isValid}
          >
            중복확인
          </button>
        )}
        {name === 'password' && <div className="invisible w-20 h-8"></div>}
      </div>
    </div>
  )
}
