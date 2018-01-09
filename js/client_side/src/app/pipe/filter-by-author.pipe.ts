import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../model/book";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'filterByAuthor'
})
export class FilterByAuthorPipe implements PipeTransform {

  transform(books: Book[], filter?: string): any {
    return isNullOrUndefined(filter) ? books : books.filter(function (book){
    return book.author.toLowerCase().includes(filter.toLowerCase()); })
    }
  }