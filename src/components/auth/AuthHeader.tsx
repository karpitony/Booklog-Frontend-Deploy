import cn from '../../libs/cn'

export default function AuthHeader() {
  return (
    <div
      className={cn(
        'relative w-full h-60 md:h-80 xl:h-[382px]',
        'flex items-center justify-center bg-[#F1F1F1] z-0'
      )}
    >
      <div className="text-center pt-14 md:px-32">
        <div className="flex flex-col items-center mt-6 md:mt-20 gap-6 w-fit font-rockwell font-normal">
          <h1 className="w-fit text-3xl md:text-5xl xl:text-[90px] text-[#2B5877] cursor-pointer select-none">
            Welcome to BookLog!
          </h1>
          <h2 className="w-fit text-1xl md:text-2xl xl:text-4xl text-[#918F8F] cursor-pointer select-none">
            join our community and share your book reviews.
          </h2>
        </div>
      </div>
    </div>
  )
}
