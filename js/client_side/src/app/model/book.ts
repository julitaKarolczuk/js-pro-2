import {Author} from './author';

export class Book {
  public bookId: number;
  public authors: Author[];
  public country: string;
  public language: string;
  public pages: number;
  public title: string;
  public year: number;

  static clone(book: Book) {
    let clone = new Book();
    clone.bookId = book.bookId;
    clone.authors = book.authors;
    clone.country = book.country;
    clone.language = book.language;
    clone.pages = book.pages;
    clone.title = book.title;
    clone.year = book.year;

    return clone;
  }
}
