export interface ReviewSuccessResponse {
  id: number
}

export interface ErrorResponse {
  code: string
  message: string
}

// 파일 정보 인터페이스
export interface FileInfo {
  id: number
  logicalName: string
  physicalPath: string
}

// 책 정보 인터페이스
export interface BookInfo {
  id: number
  title: string
  author: string
  description: string
  file: FileInfo
}

// 독후감 상세 정보 인터페이스
export interface ReviewDetailResponse {
  id: number
  title: string
  content: string
  name: string
  file: FileInfo
  book: BookInfo[]
  createdAt: string
  updatedAt: string
}