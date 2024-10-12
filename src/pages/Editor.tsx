import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getReview, editReview, makeReview } from '../services/ReviewService';
import { fetchBookId } from '../services/IsbnBookIdService';
import BookReportHeader from "../components/Editor/BookReportHeader";
import TextFiled from "../components/Editor/TextFiled";
import Footer from "../components/Editor/Footer";

export default function Editor() {
  const [context, setContext] = useState<string>('');
  const [title, setTitle] = useState<string>(''); 
  const [thumbnail, setThumbnail] = useState<File | string | undefined>(undefined); // File | string 타입으로 변경
  const [bookIsbn, setBookIsbn] = useState<string>('');
  const [bookID, setBookID] = useState<number>(0);
  const [isPostOk, setIsPostOk] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const articleId = searchParams.get('articleId');

  useEffect(() => {
    if (bookIsbn) {
      setTimeout(() => {
        const fetchBookId1 = async () => {
          const bookData = await fetchBookId(bookIsbn);
          const responseBookId = bookData?.id;
          const responseBookTitle = bookData?.title;
          if (responseBookId !== undefined) {
            setBookID(responseBookId);
            console.log('책 ID:', responseBookId);
            console.log('책 제목:', responseBookTitle);
          } else {
            console.error('책 ID를 가져오는 중 오류가 발생했습니다.');
          }
        };
        fetchBookId1();
      }, 1000);
    }
  }, [bookIsbn]);

  useEffect(() => {
    if (!articleId) {
      setIsFirst(true);
      console.log('first');
      return;
    }
    if (articleId) {
      const fetchArticle = async () => {
        try {
          const response = await getReview(Number(articleId));
          if ('code' in response && 'message' in response) {
            console.error('게시글 정보를 가져오는 중 오류가 발생했습니다.');
          } else {
            setTitle(response.title);
            setContext(response.content);
            setBookIsbn(response.id.toString());
            setThumbnail(response.file.physicalPath); // 수정: 썸네일이 URL로 제공될 경우 처리
            setIsPostOk(true);
          }
        } catch (error) {
          console.error('에러 발생:', error);
        }
      }
      fetchArticle();
      setIsFirst(false);
    }
  }, [articleId]);
  
  const onPost = () => {
    if (isPostOk && isFirst) {
      const postArticle = async () => {
        const request = {
          title: title,
          content: context,
          bookId: bookID,
        };

        const formData = new FormData();
        formData.append('request', JSON.stringify(request));

        if (thumbnail && typeof thumbnail !== 'string') {
          formData.append('file', thumbnail);
        }

        // FormData 내용 확인
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
          const response = await makeReview(formData);
          // 응답 처리
          navigate(`/book/${bookIsbn}`);
        } catch (error) {
          console.error('게시글 작성 실패:', error);
        }
      };
      postArticle();
    } else if (isPostOk && !isFirst) {
      const editArticle = async () => {
        const request = {
          title: title,
          content: context,
          bookId: bookID,
        };

        const formData = new FormData();
        formData.append('request', JSON.stringify(request));

        if (thumbnail && typeof thumbnail !== 'string') {
          formData.append('file', thumbnail);
        }

        // FormData 내용 확인
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
          const response = await editReview(Number(articleId), formData);
          navigate(`/article/${articleId}`);
          // 응답 처리
        } catch (error) {
          console.error('게시글 수정 실패:', error);
        }
      };
      editArticle();
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (title && context && bookIsbn) {
      setIsPostOk(true);
    } else {
      setIsPostOk(false);
    }
  }, [title, context, bookIsbn]);

  return (
    <div className='min-h-screen'>
      <main className='pb-[80px]'>
        <BookReportHeader 
          title={title}
          setTitle={setTitle}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          bookIsbn={bookIsbn}
          setBookIsbn={setBookIsbn}
        />
        <TextFiled 
          context={context}
          setContext={setContext}
        />
      </main>
      <Footer 
        isPostOk={isPostOk}
        onPost={onPost}
        onCancel={onCancel}
      />
    </div>
  )
};
