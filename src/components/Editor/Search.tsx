import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchBookId } from '../../services/IsbnBookIdService';
import SearchBar from './BookReportHeader/SearchBar';
import SearchResults from './BookReportHeader/SearchResults';

interface SearchProps {
  bookIsbn: string;
  setBookIsbn: (isbn: string) => void;
}

export default function Search({bookIsbn, setBookIsbn}: SearchProps) {
  const [readBookTitle, setReadBookTitle] = useState<string>('');
  const [searchText, setSearchText] = useState<string>(''); // 검색어 상태 추가
  const [presetReadBookTitle, setPresetReadBookTitle] = useState<string | undefined>('');
  const [isSearchOk, setIsSearchOk] = useState<boolean>(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isbnFromUrl = searchParams.get('isbn');
  const bookTitleFromUrl = searchParams.get('bookTitle');
  
  useEffect(() => {
    if (bookIsbn) {
      setTimeout(() => {
        const fetchBookId1 = async () => {
          const bookData = await fetchBookId(bookIsbn);
          const responseBookId = bookData?.id;
          const responseBookTitle = bookData?.title;
          if (responseBookId !== undefined) {
            setPresetReadBookTitle(responseBookTitle);
            console.log('책 제목:', responseBookTitle);
            setIsSearchOk(false);
          } else {
            console.error('책 ID를 가져오는 중 오류가 발생했습니다.');
          }
        };
        fetchBookId1();
      }, 1000);
    }
  }, [bookIsbn]);

  useEffect(() => {
    if (presetReadBookTitle) {  
      setReadBookTitle(presetReadBookTitle);
      console.log('사전 설정된 책제목 : ', presetReadBookTitle);
    } else {
      console.log('사전 설정된 책제목이 null');
    }
  }, [presetReadBookTitle]);

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
      isSearchOk={isSearchOk}
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