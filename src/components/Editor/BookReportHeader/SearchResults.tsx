import { useSearchBookByName } from '../../../hooks/UseSearchBookbyName';
import { BookData } from '../../../model/BookData';
import BookCardComponent from '../../common/BookCardComponent';

interface SearchResultsProps {
  searchText: string;
  onResultClick: (result: string) => void;
  setBookIsbn: (value: string) => void;
}

export default function SearchResults({ searchText, onResultClick, setBookIsbn }: SearchResultsProps) {
  const { books, error, loading } = useSearchBookByName(searchText);

  const handleBookClick = (book:any) => {
    onResultClick(book.title);
    setBookIsbn(book.isbn);
  };

  return (
    <div className="p-4 relative">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 검색 결과 목록 */}
      <div
        className="absolute top-0 left-0 w-full bg-white shadow-lg rounded-lg z-50 mt-2"
        style={{ zIndex: 1 }} 
      >
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 max-w-4xl mx-auto px-4">
          {!loading && !error && books.map((book: BookData, index: number) => (
            <BookCardComponent
              key={index}
              title={book.title}
              imageUrl={book.image}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
