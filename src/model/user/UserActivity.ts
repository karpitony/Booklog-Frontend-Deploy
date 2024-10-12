export interface UserActivity {
  userId: string
  userName: string
  bookCount: number
  reviewCount: number
  bookResponses: Array<BookResponse>
}

export interface BookResponse {
  id: number
  title: string
  author: string
  description: string
  isbn: string | null
  file: BookFile
}

interface BookFile {
  id: number
  logicalName: string
  physicalPath: string
}
