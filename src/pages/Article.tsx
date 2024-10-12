import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookData as fetchBookDetails } from '../services/BookService';
import { HiDotsVertical } from "react-icons/hi";
import { getReview, deleteReview } from '../services/ReviewService';
import cn from '../libs/cn';
import Pen from '../assets/icons/Pen.svg';
import TrashCan from '../assets/icons/TrashCan.svg';
import DefaultThumbnail from '../assets/images/DefaultThubnail.png';
import GoBack from '../assets/icons/GoBack.svg';

interface ArticleData {
  title: string;
  thumbnail?: string;
  context: string;
  bookIsbn: string;
  date: string;
}

interface ArticleBookData {
  title: string;
}

export default function Article() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [bookData, setBookData] = useState<ArticleBookData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

useEffect(() => {
  if (!articleSlug) return;

  if (articleSlug === 'test') {
    setArticleData({
      title: '스벨트는 우주 최강 프레임워크인 것 같다.',
      context: '아무래도 리액트를 다 스벨트로 갈아엎어 버리고 싶다. 나는 스벨트를 할 줄 모른다.',
      bookIsbn: '9791193926161',
      date: '2021-01-01',
      thumbnail: undefined,
    });
  } else {
    const getArticleData = async () => {
      try {
        const reviewId = Number(articleSlug);
        const response = await getReview(reviewId);

        if ('code' in response && 'message' in response) {
          // ErrorResponse 타입일 경우
          setError('게시글 정보를 가져오는 중 오류가 발생했습니다.');
        } else {
          // ReviewDetailResponse 타입일 경우
          const tempData = {
            title: response.title,
            context: response.content,
            bookIsbn: response.id.toString(),
            date: response.createdAt,
            thumbnail: response.file?.physicalPath,
          };
          setArticleData(tempData);
        }
      } catch (err) {
        console.error(err);
        setError('게시글 정보를 가져오는 중 오류가 발생했습니다.');
      }
    };
    getArticleData();
  }
}, [articleSlug]);

  useEffect(() => {
    if (!articleData?.bookIsbn) return;

    const getBookDetails = async () => {
      try {
        const data = await fetchBookDetails(articleData.bookIsbn);
        setBookData(data);
      } catch (err) {
        setError('책 정보를 가져오는 중 오류가 발생했습니다.');
      }
    };
    getBookDetails();
  }, [articleData?.bookIsbn]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  if (!articleData || !bookData) {
    return <div>Loading...</div>;
  }

  const { title: articleTitle, context, thumbnail } = articleData;
  const { title: bookTitle } = bookData;

  const onEdit = () => {
    navigate(`/editor/?articleId=${articleSlug}`);
  };

  const onDelete = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      const deleteArticle = async () => {
        try {
          const response = await deleteReview(Number(articleSlug));
          // 성공 시 response는 void이므로 바로 navigate
          alert('게시글이 삭제되었습니다.');
          navigate(-1);
        } catch (error) {
          // 에러가 발생하면 알림 표시
          alert('게시글 삭제 중 오류가 발생했습니다.');
        }
      };
      deleteArticle();
    }
  };

  return (
    <div className='flex-col justify-center'>
      <div className='w-full flex p-4 pt-16 gap-2 mx-auto max-w-5xl mb-6 md:mb-10'>
        
        <img
          src={thumbnail || DefaultThumbnail}
          alt="게시글 썸네일"
          className='w-24 h-24 rounded-xl shadow-lg inline'
        />

        {/* 게시글 정보 */}
        <div className='flex-1'>
          <h1 className='text-lg font-semibold block mb-2'>{articleTitle}</h1>
          <h2 className='text-sm mb-1'>
            <span className='text-[#2B5877]'>{`${bookTitle}`}</span>을 읽고
          </h2>
          <h2 className='text-sm text-gray-400'>{articleData.date}</h2>
        </div>
          
        {/* 수정, 삭제 버튼 */}
        <div className='flex justify-end items-start'>
          <button 
            onClick={onEdit}
            className='hidden mr-2 bg-[#2B5877] text-white px-4 py-2 gap-2 rounded-lg text-xs md:text-sm md:flex items-center'
          >
            <img
              src={Pen}
              alt='수정'
              className='w-4 h-4'
            />
            독후감 수정
          </button>
          <button 
            onClick={onDelete}
            className='hidden mr-2 bg-[#2B5877] text-white px-4 py-2 gap-2 rounded-lg text-xs md:text-sm md:flex items-center'
          >
            <img
              src={TrashCan}
              alt='삭제'
              className='w-4 h-4'
            />
            삭제하기
          </button>
          <HiDotsVertical 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='w-6 h-6 md:hidden' 
          />

          {/* 메뉴 창 */}
          {isMenuOpen && (
            <div 
              ref={menuRef}
              className='absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded-lg shadow-lg z-50'
            >
              <button 
                onClick={onEdit}
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                수정
              </button>
              <button 
                onClick={onDelete}
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 게시글 내용 */}
      <div className={cn(
        'w-full flex justify-center px-4 mx-auto max-w-5xl',
        )}
      >
        {/* 선 만드려고 넣은 div */}
        <div className='w-full border-t-2 border-gray-300'>
          <p className='w-full mt-6'>{context}</p>
        </div>
      </div>

      {/* 모바일 전용 푸터 */}
      <div className='fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-300 p-4 flex items-center'>
        <img
          src={GoBack}
          alt='뒤로가기'
          className='w-6 h-6'
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}