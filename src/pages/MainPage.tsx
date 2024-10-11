import { useState } from 'react';
import MainPageContext from '../components/MainPage/MainPageContext.tsx';
import SearchBar from '../components/MainPage/SearchBar.tsx';
import CurrentlyTrendingBook from '../components/MainPage/CurrentlyTrendingBook.tsx';
import SearchResult from '../components/MainPage/SearchResult.tsx';

export default function MainPage() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (searchText: string) => {
    setIsSearch(true);
    setSearchText(searchText);
  };

  return (
    <>
      <MainPageContext />

      {/* Search Bar */}
      <SearchBar 
        onSearch={handleSearch} 
        searchText={searchText}
      />
      <hr className='mx-2 md:mx-20 mt-6 md:mt-10 border-t-2'/>
      <div>
        {isSearch ? <SearchResult searchTerm={searchText} /> : <CurrentlyTrendingBook/>}
      </div>
    </>
  );
}
