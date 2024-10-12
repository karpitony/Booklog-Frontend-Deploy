import { useEffect, useState } from 'react'
import { UserActivity } from '../model/user/UserActivity'
import { getUseReadBookList } from '../services/BookService'

export const UseUserReadBooks = () => {
  const [data, setData] = useState<UserActivity | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getBookData = async () => {
      try {
        const data = await getUseReadBookList()
        setData(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
        )
      }
    }

    getBookData()
  }, [])

  return { data, error }
}
