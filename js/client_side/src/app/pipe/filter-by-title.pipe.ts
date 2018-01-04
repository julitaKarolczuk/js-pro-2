import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../model/book";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'filterByTitle'
})
export class FilterByTitlePipe implements PipeTransform {

  transform(books: Book[], filter?: string): any {
    return isNullOrUndefined(filter) ? books : books.filter(book => book.title.toLowerCase().includes(filter.toLowerCase()))
  }

}
