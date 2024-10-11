import cn from '../../libs/cn';

export default function MainPageContext() {
  return (
    <div
    className={cn(
      'relative w-full flex-col justify-center text-center',
      'flex flex-col items-center gap-3 md:gap-6',
      'w-fit font-rockwell font-normal'
    )}
  >
    <h1 
      className={cn(
        "w-fit text-4xl md:text-6xl xl:text-8xl text-[#2B5877]",
        "mt-14 md:mt-20 xl:mt-32 cursor-pointer select-none"
      )}
      style={{ letterSpacing: '0.1em' }}
    >
      BookLog
    </h1>
    <h2 className={cn(
      "w-fit text-base md:text-2xl xl:text-4xl text-[#918F8F]",
      'mb-6 md:mb-0 cursor-pointer select-none'
    )}>
      join our community and share your book reviews.
    </h2>
  </div>
  )
};