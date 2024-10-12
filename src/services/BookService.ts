import axios from 'axios'
import { NAVER_API_HEADERS, getBookSearchUrl } from '../config/BookClient'
import { BookData } from '../model/BookData'
import apiClient from '../config/ApiClient'
import { UserActivity } from '../model/user/UserActivity'
import { getBookIdRequest } from '../model/BookRequest'
import { getBookIdResponse } from '../model/BookResponse'

const ERROR_MESSAGES = {
  NOT_FOUND: '책 데이터를 찾을 수 없습니다.',
  API_REQUEST_FAILED: '네이버 API 요청 실패',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
}

export const fetchBookData = async (
  bookSlug: string
): Promise<BookData | null> => {
  try {
    const response = await axios.get(getBookSearchUrl(bookSlug), {
      headers: NAVER_API_HEADERS,
    })

    const data = response.data
    if (data.items && data.items.length > 0) {
      return data.items[0]
    } else {
      throw new Error(ERROR_MESSAGES.NOT_FOUND)
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || ERROR_MESSAGES.API_REQUEST_FAILED
      )
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }
}

export const getUseReadBookList = async (): Promise<UserActivity | null> => {
  try {
    // auth인터셉터가 제대로 작동하지 않아서 결과를 확인하기 위한 at 하드코딩

    // const config = {
    //   headers: {
    //     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1bW1kZXYwM0BnbWFpbC5jb20iLCJpYXQiOjE3Mjg3MTU4NzcsImV4cCI6MTcyODcyMzA3Nywic3ViIjoiYmx1ZWtta3kiLCJpZCI6ImJsdWVrbWt5In0.9v2Pc1TxAbMpL5rfamuxrBW3G27qSoAtBFPjGddVWlY`,
    //   },
    // }

    // const response = await apiClient.get('books/me', config)

    const response = await apiClient.get('books/me')

    const data = response.data
    if (data) {
      return data
    } else {
      throw new Error(ERROR_MESSAGES.NOT_FOUND)
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || ERROR_MESSAGES.API_REQUEST_FAILED
      )
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }
}

export const fetchBookId = async ({
  isbn,
}: getBookIdRequest): Promise<getBookIdResponse | null> => {
  try {
    const response = await apiClient.get<getBookIdResponse>(`/books/${isbn}`)
    return response.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null
    } else if (error.response?.status === 403) {
      return null
    } else {
      console.error('서버 통신 실패', error)
      throw error
    }
  }
}