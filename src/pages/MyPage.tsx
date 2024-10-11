import cn from "../libs/cn";
import NoBook from "../components/MyPage/NoBook";
import BookList from "../components/MyPage/BookList";
import Pen from '../assets/icons/Pen.svg';
import { useNavigate } from 'react-router-dom'

export default function MyPage() {
  
  // 임시로 하드코딩한 유저 데이터
  const userName = '홍길동';
  let bookCount = 4;
  const bookReportCount = 15;

  const navigate = useNavigate()

  return (
    <>
      <div className="px-10 md:px-32 xl:px-60 pt-14 md:pt-28">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-6">
          {userName}
        </h1>
        <p className="text-sm md:text-xl lg:text-2xl">
          지금까지 <span className="text-[#EC6B53]">{bookCount}권</span>의 책을 읽고 <span className="text-[#EC6B53]">{bookReportCount}개</span>의 독후감을 작성했어요.
        </p>
      </div>
      <div className="px-10 md:px-16 xl:px-32 py-10 md:py-20">
        <hr className="mb-6 md:mb-12"/>
        <div className={cn(
          "px-0 md:px-16 xl:px-28",
          "flex justify-left items-center gap-5"
        )}>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-10 inline">
            내가 읽은 책
          </h2>
          <button
            onClick={() => navigate('/editor')} 
            className={cn(
            "bg-[#2B5877] text-white px-4 py-2 md:py-3 rounded-lg",
            "text-xs md:text-sm font-semibold mb-6 md:mb-10 flex items-center"
          )}>
            <img 
              src={Pen} 
              alt="pen" 
              className="w-4 h-4 md:w-5 md:h-5 inline mr-2 text-white"
            />
            독후감 쓰기
          </button>
        </div>
      { (bookCount === 0) ? <NoBook /> : <BookList /> }
      </div>
    </>
  );
}