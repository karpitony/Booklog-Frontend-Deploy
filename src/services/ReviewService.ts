import { ReviewMakeFormData } from '../model/ReviewMakeRequest'
import { ReviewEditFormData } from '../model/ReviewEditRequest'
import {
  ReviewSuccessResponse,
  ErrorResponse,
  ReviewDetailResponse,
} from '../model/ReviewResponse'
import { ReviewListRequest } from '../model/ReviewListRequest'
import { ReviewListResponse } from '../model/ReviewListResponse'
import apiClient from '../config/ApiClient'

// 독후감 생성
export const makeReview = async (
  data: FormData
): Promise<ReviewSuccessResponse | ErrorResponse> => {
  try {
    const response = await apiClient.post<ReviewSuccessResponse>(
      '/reviews',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

// 독후감 조회
export const getReview = async (
  id: number
): Promise<ReviewDetailResponse | ErrorResponse> => {
  try {
    const response = await apiClient.get<ReviewDetailResponse>(`/reviews/${id}`)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

// 독후감 수정
export const editReview = async (
  reviewId: number,
  data: FormData
): Promise<ReviewDetailResponse | ErrorResponse> => {
  try {
    const response = await apiClient.patch<ReviewDetailResponse>(
      `/reviews/${reviewId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

// 독후감 삭제
export const deleteReview = async (
  reviewId: number
): Promise<void | ErrorResponse> => {
  try {
    await apiClient.patch(`/reviews/delete/${reviewId}`)
  } catch (error) {
    return handleError(error)
  }
}

// 에러 핸들링 함수
const handleError = (error: any): ErrorResponse => {
  if (error.response && error.response.data) {
    return {
      code: error.response.status.toString(),
      message: error.response.data.message || '알 수 없는 오류가 발생했습니다.',
    }
  } else {
    return {
      code: '500',
      message: '서버와 연결할 수 없습니다.',
    }
  }
}

export const getReviewsByBookId = async (
  request: ReviewListRequest
): Promise<ReviewListResponse | ErrorResponse> => {
  try {
    const response = await apiClient.get<ReviewListResponse>(
      `/reviews/lists/${request.bookId}`
    )
    return response.data
  } catch (error) {
    return handleError(error)
  }
}
