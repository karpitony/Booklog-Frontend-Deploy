import { UseFormRegister } from 'react-hook-form'

interface LoginInputProps {
  icon: string
  placeholder: string
  register: UseFormRegister<any>
  name: string
  required?: boolean
}

export default function LoginInput({
  icon,
  placeholder,
  register,
  name,
  required,
}: LoginInputProps) {
  return (
    <div className="flex flex-row border-b-[1px] border-b-[#918f8f] gap-4 py-4 px-3">
      <img src={icon} alt="Input Icon" className="" />
      <input
        type={name === 'password' ? 'password' : 'text'}
        {...register(name, { required })}
        className="w-full placeholder-[#918f8f] focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  )
}
