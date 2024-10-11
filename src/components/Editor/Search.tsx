import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './BookReportHeader/SearchBar';
import SearchResults from './BookReportHeader/SearchResults';

interface SearchProps {
  setBookIsbn: (isbn: string) => void;
}

export default function Search({setBookIsbn}: SearchProps) {
  const [readBookTitle, setReadBookTitle] = useState<string>('');
  const [searchText, setSearchText] = useState<string>(''); // 검색어 상태 추가

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isbnFromUrl = searchParams.get('isbn');
  const bookTitleFromUrl = searchParams.get('bookTitle');

  useEffect(() => {
    if (isbnFromUrl) {
      setBookIsbn(isbnFromUrl);
      console.log('isbnFromUrl : ', isbnFromUrl);
    } else {
      console.log('isbnFromUrl is null');
    }
    if (bookTitleFromUrl) {
      setReadBookTitle(bookTitleFromUrl);
      console.log('bookTitleFromUrl : ', bookTitleFromUrl);
    } else {
      console.log('bookTitleFromUrl is null');
    }
  }, [isbnFromUrl, bookTitleFromUrl]);

  const handleSearch = (text: string) => {
    setSearchText(text); 
  };

  const handleResultClick = (result: string) => {
    setReadBookTitle(result); 
    setSearchText(''); 
  };

  return (
    <>
    {/* SearchBar 컴포넌트 */}
    <SearchBar 
      readBookTitle={readBookTitle}
      setReadBookTitle={setReadBookTitle}
      onSearch={handleSearch}
    />

    {/* SearchResults 컴포넌트에 검색어 전달 */}
    <SearchResults 
      searchText={searchText}
      onResultClick={handleResultClick}
      setBookIsbn={setBookIsbn}
    />
  </>
  );
}