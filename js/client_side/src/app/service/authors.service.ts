import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Author} from '../model/author';

@Injectable()
export class AuthorsService {

  private readonly PATH = 'http://localhost:3001/author';

  constructor(private http: HttpClient) { }

  getAllAuthors(){
    return this.http.get<Author[]>(this.PATH + '/all');
  }

  getAuthorById(authorId: number){
    return this.http.get<Author>(this.PATH + '/' + authorId);
  }

  createAuthor(author: Author){
    return this.http.post(this.PATH + '/create', author);
  }

  updateAuthor(authorId: number, updatedData){
    return this.http.put(this.PATH + '/' + authorId + '/update', updatedData);
  }

  deleteAuthorById(authorId: number){
    return this.http.delete(this.PATH + '/' + authorId + '/delete');
  }
}
