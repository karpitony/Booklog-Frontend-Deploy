import { useEffect, useState } from 'react'
import axios from 'axios'
import { NAVER_API_HEADERS, getBookSearchUrl } from '../config/BookClient'
import { BookData } from '../model/BookData'

const ERROR_MESSAGES = {
  NOT_FOUND: '책 데이터를 찾을 수 없습니다.',
  API_REQUEST_FAILED: '네이버 API 요청 실패',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
}

export const useSearchBookByName = (searchTerm: string) => {
  const [books, setBooks] = useState<BookData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (searchTerm) {
      const fetchBooks = async () => {
        setLoading(true)
        setError(null)
        try {
          const response = await axios.get(getBookSearchUrl(searchTerm, 100), {
            headers: NAVER_API_HEADERS,
          })

          const data = response.data
          if (data.items && data.items.length > 0) {
            setBooks(data.items)
          } else {
            setBooks([])
            throw new Error(ERROR_MESSAGES.NOT_FOUND)
          }
        } catch (err) {
          setError(
            axios.isAxiosError(err) && err.response
              ? err.response.data.message || ERROR_MESSAGES.API_REQUEST_FAILED
              : ERROR_MESSAGES.UNKNOWN_ERROR
          )
        } finally {
          setLoading(false)
        }
      }

      fetchBooks()
    } else {
      setBooks([])
    }
  }, [searchTerm])

  return { books, error, loading }
}
