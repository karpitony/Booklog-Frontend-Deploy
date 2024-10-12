export interface File {
  id: number
  logicalName: string
  physicalPath: string
}

export interface Book {
  id: number
  title: string
  author: string
  description: string
  file: File
}

export interface Review {
  id: number
  title: string
  content: string
  name: string
  userId: string
  file: File
  book: Book
  createAt: string
  updatedAt: string
}

export interface ReviewListResponse {
  reviews: Review[]
}
