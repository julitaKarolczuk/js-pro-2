import {Author} from './author';

export class Book {
  public bookId: number;
  public authors: Author[];
  public country: string;
  public language: string;
  public pages: number;
  public title: string;
  public year: number;
}
