import { Component, OnInit, ViewChild} from '@angular/core';
import {Book} from '../model/book';
import {BooksService} from '../service/books.service';
import {FilterByTitlePipe} from "../pipe/filter-by-title.pipe";
import {Author} from "../model/author";
import {AuthorsService} from "../service/authors.service";
import {SelectItem} from "primeng/primeng";
import {isNullOrUndefined, isUndefined} from "util";
import {FormGroup} from "@angular/forms";
import {CustomMessageService} from "../service/custom-message.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [ FilterByTitlePipe ]
})
export class BooksComponent implements OnInit {

  allBooks: Book[]=[];

  pagedBooks: Book [] = [];

  filteredBooks: Book[];

  filter: string = '';

  paginatorSettings = {rows: 2, pageLinkSize: 3, totalRecords: null};

  bookToAdd = new Book();

  authors : Author [];

  authorsSelect: SelectItem[] = [];

  @ViewChild('bookForm')
  bookForm: FormGroup;

  constructor (private booksService: BooksService,
               private filterPipe : FilterByTitlePipe,
               private authorsService: AuthorsService,
               private messageService: CustomMessageService) {
    this.getAuthors();
  }

  ngOnInit() {
	  this.getBooks();
  }

  getAuthors(){
    this.authorsService.getAllAuthors().subscribe(data =>
      data.forEach(author => this.authorsSelect.push({label: author.firstName + ' ' + author.lastName, value: author})),
      error => console.log('blad podczas pobierania autorow.'));
  }

  createBook(){
    this.booksService.createBook(this.bookToAdd).subscribe(success => {
      this.getBooks();
      this.bookForm.reset();
      this.messageService.showSuccessMessage('Dodano pomyślnie')
    }, error => this.messageService.showErrorMessage('Błąd podczas dodawania'));
  }

  getBooks(){
	  this.booksService.getAllBooks().subscribe( data => {
	    this.allBooks = data;
	    this.pagedBooks = this.allBooks.slice(0, this.paginatorSettings.rows);
	    this.filteredBooks = this.allBooks;
	    this.setPaginatorSettings(this.allBooks.length);
    }, error => this.messageService.showErrorMessage('Błąd podczas dodawania'));
  }

  setPaginatorSettings(totalRecords: number = this.allBooks.length){
    this.paginatorSettings.totalRecords = totalRecords;
  }

  deleteBook(book:Book):void{
    this.booksService.deleteBookById(book.bookId).subscribe( (data) => {
      this.getBooks();
      this.messageService.showSuccessMessage('Usunięto pomyślnie.')
    }, error => this.messageService.showErrorMessage('Błąd podczas usuwania.'));
  }

  paginate(event){
    this.filter ? this.pagedBooks = this.filteredBooks.slice(event.first, event.rows * (event.page + 1)) :
      this.pagedBooks = this.allBooks.slice(event.first, event.rows * (event.page + 1));
  }

  filterBooks(){
    if(this.filter) {
      this.filteredBooks = this.filterPipe.transform(this.filteredBooks, this.filter);
      this.setPaginatorSettings(this.filteredBooks.length);
      this.pagedBooks = this.filteredBooks.slice(0, this.paginatorSettings.rows);
    }
    else {
      this.setPaginatorSettings();
      this.pagedBooks = this.allBooks.slice(0, 2);
    }
  }

  isInvalid(){
    return isNullOrUndefined(this.bookToAdd.authors) || this.bookToAdd.authors.length == 0 ||
      isNullOrUndefined(this.bookToAdd.year) || isNullOrUndefined(this.bookToAdd.pages < 0);
  }

}
