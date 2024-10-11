import { useState, useRef } from 'react';
import MagnifyingGlass from '../../assets/icons/MagnifyingGlass.svg';
import cn from '../../libs/cn.ts';

interface SearchBarProps {
  searchText: string;
  onSearch: (searchText: string) => void;
}

export default function SearchBar({ onSearch, searchText }: SearchBarProps) {
  const [localSearchText, setLocalSearchText] = useState(searchText);
  const [placeholder, setPlaceholder] = useState('궁금한 책 제목이나 저자를 검색해보세요!');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchText(e.target.value); // 입력한 텍스트 업데이트
  };

  const handleButtonClick = () => {
    onSearch(localSearchText); // 검색어를 전달
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') {
      return;
    }
    e.preventDefault();
    
    handleButtonClick(); // 엔터키 눌렀을 때 검색 버튼 클릭 동작 수행
  };

  return (
    <div
      className={cn(
        'relative w-full flex justify-center items-center mt-6 md:mt-20 xl:mt-24',
        'gap-2 font-rockwell font-normal px-4 md:px-20 xl:px-40',
      )}
    >
      <div className="relative w-full max-w-[1600px] border-b-2 border-[#2B5877]">
        <input
          type="text"
          placeholder={placeholder}
          onFocus={() => setPlaceholder('')}
          onBlur={() => setPlaceholder('궁금한 책 제목이나 저자를 검색해보세요!')}
          value={localSearchText}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          className={cn(
            'w-full p-2 text-left', // 반응형 너비
            'text-base md:text-xl xl:text-2xl focus:outline-none'
          )}
        />
        <button 
          onClick={handleButtonClick} 
          className="absolute right-0 top-3 md:top-0 mr-2"
        >
          <img 
            src={MagnifyingGlass} 
            alt="Search" 
            className="w-4 md:w-6 xl:w-8 h-4 md:h-6 xl:h-8" 
          />
        </button>
      </div>
    </div>
  );
}
