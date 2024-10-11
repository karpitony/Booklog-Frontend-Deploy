import { useRef, useEffect } from 'react';
import DefaultThubnail from '../../assets/images/DefaultThubnail.png';
import cn from '../../libs/cn';
import Search from './Search';

interface BookReportHeaderEditorProps {
  title: string;
  setTitle: (value: string) => void;
  thumbnail: string;
  setThumbnail: (value: string) => void;
  bookIsbn: string;
  setBookIsbn: (value: string) => void;
}

export default function BookReportHeaderEditor(
  {title, setTitle, thumbnail, setThumbnail, bookIsbn, setBookIsbn}: BookReportHeaderEditorProps) {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setThumbnail(imageUrl); // 이미지 미리보기
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (bookIsbn) {
      console.log('ISBN:', bookIsbn);
    }
  }, [bookIsbn]);

  return (
    <div className={cn(
      "p-4 md:p-8 flex justify-center",
      "mx-0 md:mx-24 xl:mx-32 border-b-2"
    )}>
      <div className="hidden md:block mr-10 text-left max-w-36">
        <h2 className='text-xl md:text-2xl text-[#2B5877]'>썸네일</h2>
        <img
          src={thumbnail || DefaultThubnail} 
          alt="썸네일" 
          className="x-24 md:x-32 xl:w-36 h-24 md:h-32 xl:h-36 rounded-xl shadow-lg" 
        />
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*" 
          onChange={handleThumbnailChange} 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "mt-2 block w-full text-sm text-gray-400",
            "rounded-lg cursor-pointer focus:outline-none"
          )}
        >
          썸네일 추가
        </button>
      </div>

      <div className="flex-1 text-left max-w-2xl">
        <div className="flex justify-between">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl text-[#2B5877] mb-2">제목</h2>
            <input
              id="title" 
              type="text" 
              placeholder="제목을 입력하세요" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-300 text-base md:text-lg mb-5"
            />
          </div>

          {/* 모바일에서만 보이는 썸네일 */}
          <div className="flex flex-col items-start md:hidden ml-3">
            <h2 className="text-center text-base text-[#2B5877] mb-2">썸네일</h2>
            <img
              src={thumbnail || DefaultThubnail} 
              alt="썸네일" 
              onClick={handleThumbnailClick}
              className="w-14 h-14 rounded-lg" 
            />
          </div>
        </div>

        <Search setBookIsbn={setBookIsbn}/>
      </div>
    </div>
  );
}
