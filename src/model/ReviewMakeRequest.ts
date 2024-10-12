export interface ReviewMakeRequest {
  title: string
  content: string
  bookId: number
}

export interface ReviewMakeFormData {
  file?: File
  request: ReviewMakeRequest
}