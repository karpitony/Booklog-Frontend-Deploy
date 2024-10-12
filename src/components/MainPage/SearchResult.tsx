import { useNavigate } from 'react-router-dom';
import { useSearchBookByName } from '../../hooks/UseSearchBookbyName';
import { BookData } from '../../model/BookData';
import BookCardComponent from '../common/BookCardComponent';

interface SearchResultProps {
  searchTerm: string;
}

export default function SearchResult({ searchTerm }: SearchResultProps) {
  const { books, error, loading } = useSearchBookByName(searchTerm);
  const navigate = useNavigate();

  const handleBookClick = (isbn: string) => {
    const bookSlug = isbn.toString();
    navigate(`/book/${bookSlug}`);
  };

  return (
    <div className="p-4">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 검색 결과가 없을 때 */}
      {!loading && !error && books.length === 0 && (
        <p className="text-center">검색 결과가 없습니다.</p>
      )}

      {/* 검색 결과가 있을 때만 헤더 표시 */}
      {!loading && !error && books.length > 0 && (
        <div className="text-left max-w-5xl mx-auto px-4 text-[#4E4D4D]">
          <h2 className='text-xl md:text-3xl font-semibold pr-2 md:pr-4 inline'>{searchTerm}</h2>
          <p className='text-lg md:text-2xl inline'>검색 결과 <span className='pl-1 text-[#EC6B53]'>{books.length}건</span></p>
        </div>
      )}

      <div className="flex justify-center">
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto px-4">
          {!loading && !error && books.map((book: BookData, index: number) => (
            <BookCardComponent
              key={index}
              title={book.title}
              imageUrl={book.image}
              onClick={() => handleBookClick(book.isbn)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
