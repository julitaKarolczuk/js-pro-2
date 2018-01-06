import {Component, OnInit, Input} from '@angular/core';
import {Book} from '../model/book';
import {BooksService} from "../service/books.service";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
import {SelectItem} from "primeng/primeng";
import {AuthorsService} from "../service/authors.service";
import {CustomMessageService} from "../service/custom-message.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;

  editedBook: Book = new Book();

  bookId: number;

  authorsSelect: SelectItem[] = [];

  constructor(private booksService: BooksService, private route: ActivatedRoute, private authorsService: AuthorsService, private messageService: CustomMessageService) {
  }

  ngOnInit() {
    this.bookId = +this.route.snapshot.paramMap.get('id');
    this.getAuthors();
    this.getBook();
  }

  private getBook() {
    this.booksService.getBookById(this.bookId).subscribe(book => {
        this.book = book;
        this.editedBook = Book.clone(this.book);
      },
        error => console.log('error get'));
  }

  getAuthors(){
    this.authorsService.getAllAuthors().subscribe(data =>
        data.forEach(author => this.authorsSelect.push({label: author.firstName + ' ' + author.lastName, value: author})),
      error => this.messageService.showErrorMessage('Błąd podczas aktualizacji.'));
  }

  updateBook() {
    this.booksService.updateBook(this.bookId, this.editedBook).subscribe(success => {
      this.book = success as Book;
      this.editedBook = Book.clone(this.book);
      this.messageService.showSuccessMessage('Zaktualizowano pomyślnie');
    },
        error => console.log('error update'));
  }

  isInvalid() {
    return isNullOrUndefined(this.book.authors) || this.book.authors.length == 0 ||
      isNullOrUndefined(this.book.year) || isNullOrUndefined(this.book.pages < 0);
  }

}
