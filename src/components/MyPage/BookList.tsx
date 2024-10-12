import { useNavigate } from 'react-router-dom'
import { BookResponse } from '../../model/user/UserActivity'
import BookCardComponent from '../common/BookCardComponent'

interface BookListData {
  bookList: Array<BookResponse>
}

export default function BookList({ bookList }: BookListData) {
  const navigate = useNavigate()

  const handleBookClick = (isbn: string) => {
    navigate(`/book/${isbn}`)
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {bookList.map((book, index) => (
          <BookCardComponent
            key={index}
            title={book.title}
            imageUrl={book.file.physicalPath}
            onClick={() => {
              if (book.isbn != null) {
                handleBookClick(book.isbn)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
