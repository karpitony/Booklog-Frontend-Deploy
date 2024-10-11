import cn from '../../libs/cn'

interface BookCardComponentProps {
  title: string
  imageUrl: string
  onClick?: () => void
}

export default function BookCardComponent({
  title,
  imageUrl,
  onClick,
}: BookCardComponentProps) {
  return (
    <div
      className="flex flex-col items-center"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="book"
        className={cn(
          // w-32 md:w-48 lg:w-60 h-40 md:h-60 lg:h-80
          'aspect-[3/4] relative w-full h-full',
          'object-cover mb-4 rounded-lg shadow-lg',
          'transform transition duration-300 ease-in-out',
          // 호버 시 크기, 그림자, 위치 변경
          'hover:scale-105 hover:shadow-2xl hover:translate-y-2'
        )}
      />
      <h3 className="text-center text-sm md:text-base lg:text-lg">{title}</h3>
    </div>
  )
}
