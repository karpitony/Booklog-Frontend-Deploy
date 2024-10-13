import { useRef } from 'react';
import MagnifyingGlass from '../../../assets/icons/MagnifyingGlass.svg';
import { searchBooks } from '../../../services/BackendBookApi';

interface SearchBarProps {
  readBookTitle: string ;
  onSearch: (searchText: string) => void;
  setReadBookTitle: (value: string) => void;
  isSearchOk: boolean;
}

export default function SearchBar({ readBookTitle, onSearch, setReadBookTitle, isSearchOk }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    const enterKeyDownEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      bubbles: true,
    });

    if (inputRef.current) {
      inputRef.current.dispatchEvent(enterKeyDownEvent); // 버튼 클릭 시 Enter 이벤트 발생
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') {
      return;
    }
    e.preventDefault();

    if (isSearchOk) {
    // 검색어를 부모 컴포넌트에 전달
    onSearch(readBookTitle);

    const searchBookFromBackend = async () => {
      console.log('검색어:', readBookTitle);
      try {
        const response = await searchBooks({ page: 1, size: 10, keyword: readBookTitle });
        console.log(response);
      } catch (error) {
        console.error('책 검색 중 오류 발생:', error);
      }
    }
    searchBookFromBackend();
    } else {
      alert('검색할 수 없습니다.')
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl text-[#2B5877] block mb-2">읽은 책</h2>
      <div className="relative w-full flex justify-center items-center">
        <input 
          type="text"
          placeholder="궁금한 책 제목을 검색해보세요!"
          value={readBookTitle}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={(e) => setReadBookTitle(e.target.value)}
          className="w-full p-3 bg-gray-100 rounded-lg text-base md:text-lg"
        />
        <button 
          className="absolute right-0 mr-2" 
          onClick={handleButtonClick}
        >
          <img 
            src={MagnifyingGlass} 
            alt="Search" 
            className="w-4 md:w-6 h-4 md:h-6" 
          />
        </button>
      </div>
    </div>
  );
}
