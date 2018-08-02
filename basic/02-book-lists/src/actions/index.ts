import { Book } from '../types';

export function selectBook(book: Book) {
  return {
    payload: book,
    type: "BOOK_SELECTED",
  };
}