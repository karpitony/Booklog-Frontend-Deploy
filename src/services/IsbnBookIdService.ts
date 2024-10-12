import apiClient from '../config/ApiClient';

interface BookIdResponse {
  id: number;
  title: string;
}

// ISBN으로 책 ID 받아오기
export const fetchBookId = async (isbn: string): Promise<BookIdResponse | null> => {
  try {
    const response = await apiClient.get<BookIdResponse>(`/books/${isbn}`);
    const data = response.data;

    if (data && data.id) {
      return data;
    } else {
      throw new Error('책 데이터를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('에러가 발생했습니다. : ', error);
    return null;
  }
};
