import { useNavigate } from 'react-router-dom'
import Review from '../components/book/Review.tsx'
import { useBook } from '../hooks/UseBook'
import { getDisplayAuthor } from '../libs/AuthorUtils'
import cn from '../libs/cn.ts'
import NonReviwedBook from '../assets/images/NonReviewedBook.svg'
import { useAuthStore } from '../stores/UseAuthStore.ts'

export default function Book() {
  const { bookData, error } = useBook()
  const navigate = useNavigate()
  const { isLogin } = useAuthStore()

  const gotoEditor = () => {
    if (isLogin) {
      const url = bookData?.isbn && bookData.title
        ? `/editor?isbn=${encodeURIComponent(bookData.isbn)}&bookTitle=${encodeURIComponent(bookData.title)}`
        : '/editor';
      navigate(url);
    } else {
      navigate('/login');
    }
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  let displayAuthor = ''
  if (bookData) {
    displayAuthor = getDisplayAuthor(bookData.author)
  }

  return (
    <div>
      <div className="w-screen h-64 md:h-[552px] bg-[#f1f1f1]">
        {bookData ? (
          <div className="flex justify-center pt-24 md:pt-36">
            <div className="flex flex-row gap-5 sm:gap-16 md:gap-28">
              <img
                src={bookData.image}
                alt={bookData.title}
                className={cn(
                  'w-auto h-36 md:h-80 lg:h-80 bg-[#dbdbdb] border-[1px]',
                  'border-[#dbdbdb] rounded-2xl shadow-lg'
                )}
              />
              <div className="flex flex-col w-48 xl:w-[654px] pt-2 md:pt-16">
                <div className="flex flex-col gap-2 xl:gap-8">
                  <p className="max-w-[648px] max-h-[93px] font-semibold text-sm md:text-2xl xl:text-4xl line-clamp-1">
                    {bookData.title}
                  </p>
                  <p className="max-w-[648px] font-normal text-xs xl:text-2xl">
                    {displayAuthor}
                  </p>
                </div>
                <p
                  className="pt-3 md:pt-6 xl:pt-10 max-w-[648px] text-sm text-[#4e4d4d] line-clamp-3  md:line-clamp-5"
                  style={{ lineHeight: '1.5', maxHeight: '180px' }}
                >
                  {bookData.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No book data available.</p>
        )}
      </div>
      <div className="pt-6 lg:pt-14 px-7 md:px-20">
        <div className="flex justify-between mx-0 md:mx-20">
          <p className="font-semibold text-2xl md:text-3xl xl:text-5xl">
            독자들의 감상평
          </p>
          <button
            onClick={gotoEditor}
            className={cn(
              'group bg-[#2b5877] rounded-lg',
              'hover:border-2 hover:border-[#2b5877] hover:bg-[#fafafa]'
            )}
          >
            <div className="px-3 xl:px-4 flex items-center gap-1 lg:gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 lg:w-6 h-6 lg:h-6   md:h-3 xl:h-6 fill-[#fafafa] group-hover:fill-[#2b5877]"
              >
                <g clipPath="url(#clip0_2242_1918)">
                  <path d="M3.76471 20.2353H5.24882L17.2918 8.19235L15.8076 6.70824L3.76471 18.7512V20.2353ZM2 22V18.0182L17.5182 2.50676C17.6961 2.3452 17.8925 2.22039 18.1074 2.13235C18.3225 2.04412 18.5479 2 18.7838 2C19.0197 2 19.2481 2.04186 19.4691 2.12559C19.6903 2.20931 19.8861 2.34245 20.0565 2.525L21.4932 3.97971C21.6758 4.1501 21.8059 4.34618 21.8835 4.56794C21.9612 4.78971 22 5.01147 22 5.23324C22 5.4699 21.9596 5.69569 21.8788 5.91059C21.798 6.12569 21.6695 6.32216 21.4932 6.5L5.98176 22H2ZM16.5368 7.46324L15.8076 6.70824L17.2918 8.19235L16.5368 7.46324Z" />
                </g>
              </svg>
              <p className="py-1 text-[#fafafa] text-sm group-hover:text-[#2b5877]">
                독후감 쓰기
              </p>
            </div>
          </button>
        </div>
        {bookData?.isbn === '9791163034735' ? (
          <div className="flex justify-center mt-11">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
              <Review />
              <Review />
              <Review />
              <Review />
            </div>
          </div>
        ) : (
          <div className="flex flex-col px-20 pt-14 items-center">
            <img
              src={NonReviwedBook}
              alt="NonReviwedBook"
              className="w-52 h-auto"
            />
            <p className="text-2xl text-[#918f8f]">
              아직 남겨진 독후감이 없습니다. <br /> 첫 번째 독후감을 남겨보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
