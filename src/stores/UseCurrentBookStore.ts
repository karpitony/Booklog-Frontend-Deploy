import { create } from 'zustand'

interface CurrentBookState {
  bookId: number | null
  setBookId: (bookId: number | null) => void
}

export const useCurrentBookState = create<CurrentBookState>((set) => ({
  bookId: null,
  setBookId: (bookId) => set({ bookId }),
}))
