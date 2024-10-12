import apiClient from '../config/ApiClient';

interface BookSearchParams {
  page: number;
  size: number;
  keyword: string;
}

interface FileResponse {
  id: number;
  logicalName: string;
  physicalPath: string;
}

interface BookContent {
  id: number;
  title: string;
  author: string;
  description: string;
  file: FileResponse;
}

interface Pageable {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isEnd: boolean;
}

interface BookSearchResponse {
  contents: BookContent[];
  pageable: Pageable;
}

// 책 검색 API 요청 함수
export const searchBooks = async (params: BookSearchParams): Promise<BookSearchResponse> => {
  try {
    const response = await apiClient.get<BookSearchResponse>('/books/search', {
      params: {
        page: params.page,
        size: params.size,
        keyword: params.keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error('책 검색 중 오류 발생:', error);
    throw error;
  }
};
