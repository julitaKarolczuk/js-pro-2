import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../model/book';

@Injectable()
export class BooksService {

  private readonly PATH = 'http://localhost:3001/book';

  constructor(private http: HttpClient) { }

  getAllBooks(){
    return this.http.get<Book[]>(this.PATH + '/all');
  }

  getBookById(bookId: number){
    return this.http.get(this.PATH + '/' + bookId);
  }

  createBook(book: Book){
    return this.http.post(this.PATH + '/create', book);
  }

  updateBook(bookId: number, updatedData){
    return this.http.put(this.PATH + '/' + bookId + '/update', updatedData);
  }

  deleteBookById(bookId: number){
    return this.http.delete(this.PATH + '/' + bookId);
  }

}
