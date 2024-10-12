export interface ReviewEditRequest {
  title: string
  content: string
}

export interface ReviewEditFormData {
  file?: File
  request: ReviewEditRequest
}