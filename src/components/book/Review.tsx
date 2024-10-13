import SampleReviewImg from '../../assets/images/SampleReviewImg.svg'
import cn from '../../libs/cn'
import { Review as ReviewType } from '../../model/ReviewListResponse'

interface reviewProps {
  review: ReviewType
  onClick?: () => void
}

export default function Review({ review, onClick }: reviewProps) {
  return (
    <>
      <div
        className={cn(
          'md:w-36 lg:w-52 xl:w-72 lg:h-80 flex flex-col',
          'bg-[#fafafa] shadow-lg rounded-2xl cursor-pointer',
          'hover:bg-[#FAFAFA] hover:opacity-20 hover:border-2 hover:border-[#2B5877] hover:inset-0'
        )}
        onClick={onClick}
      >
        {review.file ? (
          <img
            src={review.file.physicalPath}
            alt={review.file.logicalName}
            className="w-full md:h-auto xl:h-44 rounded-t-2xl object-cover"
          />
        ) : (
          <img
            src={SampleReviewImg}
            alt="SampleReviewImg"
            className="w-full md:h-auto xl:h-44 rounded-t-2xl"
          />
        )}
        <p className="text-xs sm:text-lg xl:text-2xl text-[#2B5877] pt-2 px-3 lg:px-8 lg:text-nowrap">
          {review.title}
        </p>
        <div className="flex flex-row pt-7 md:pb-3">
          <p className="text-xs text-nowrap xl:text-sm text-[#2B5877] ml-3 lg:ml-8 lg:py-3 md:py-4 xl:py-8">
            {review.userId}
          </p>
          <p className="w-full text-xs text-nowrap xl:text-sm text-[#918F8F] pl-8 lg:pl-10 xl:pl-24 lg:py-3 md:py-4 xl:py-8">
            {review.updatedAt}
          </p>
        </div>
      </div>
    </>
  )
}
