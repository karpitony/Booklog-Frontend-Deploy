import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchBookId } from '../services/BookService.ts'
import { useBook } from './UseBook'
import { useCurrentBookState } from '../stores/UseCurrentBookStore.ts'
import { getReviewsByBookId } from '../services/ReviewService.ts'
import { ReviewListResponse } from '../model/ReviewListResponse.ts'
import { ErrorResponse } from '../model/ReviewResponse.ts'
import { Review } from '../model/ReviewListResponse.ts'

export function useBookDetails() {
  const { bookId, setBookId } = useCurrentBookState()
  const { bookData } = useBook()
  const navigate = useNavigate()
  const [isAccessDenied, setIsAccessDenied] = useState(false)
  const [isReviewed, setIsReviewed] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchBookData = async () => {
      if (bookData?.isbn) {
        const data = await fetchBookId({ isbn: bookData.isbn })

        if (data === null) {
          setBookId(null)
          setIsAccessDenied(true)
        } else {
          setIsAccessDenied(false)
          console.log(data)
          const newBookId = Number(data.id)
          setBookId(newBookId)

          const reviewsResponse: ReviewListResponse | ErrorResponse =
            await getReviewsByBookId({
              bookId: newBookId,
            })

          if ('reviews' in reviewsResponse) {
            console.log('리뷰 응답 : ', reviewsResponse.reviews)
            setReviews(reviewsResponse.reviews)
            setIsReviewed(reviewsResponse.reviews.length > 0)
          } else {
            console.log('응답 없음 : ', reviewsResponse.message)
          }

          console.log(bookId)
        }
      }
    }

    fetchBookData()
  }, [bookData?.isbn, navigate, setBookId, bookId])

  return {
    bookData: isAccessDenied ? null : bookData,
    isAccessDenied,
    isReviewed,
    reviews,
  }
}
