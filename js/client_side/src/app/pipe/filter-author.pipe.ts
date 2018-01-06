import { Pipe, PipeTransform } from '@angular/core';
import {Author} from "../model/author";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'filterAuthor'
})
export class FilterAuthorPipe implements PipeTransform {

  transform(authors: Author [], filter?: string): any {
    return isNullOrUndefined(filter) ? authors : authors.filter(function (author) {
      return author.lastName.toLowerCase().includes(filter.toLowerCase()) || author.firstName.toLowerCase().includes(filter.toLowerCase());
    })
  }

}
