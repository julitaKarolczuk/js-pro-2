import {Component, OnInit, Input} from '@angular/core';
import {Book} from '../model/book';
import {BooksService} from "../service/books.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  bookId: number;

  constructor(private booksService: BooksService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.bookId = +this.route.snapshot.paramMap.get('id');
    this.getBook();
  }

  private getBook() {
    this.booksService.getBookById(this.bookId).subscribe(book => this.book = book,
        error => console.log('error get'));
  }

  update() {
    this.booksService.updateBook(this.bookId, this.book).subscribe(success => this.book = success as Book,
        error => console.log('error update'));
  }


}
