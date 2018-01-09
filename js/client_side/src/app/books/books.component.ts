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
 
  filteredBooks: Book[];
 
  filter: string = '';
 
  bookToAdd = new Book();
 
  authors : Author [];
 
  authorsSelect: SelectItem[] = [];
 
  isDec : boolean = false;
 
  column : string;
 
  direction : number;
 
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
 
  sort(property){
    this.isDec = !this.isDec;
    this.column = property;
    let direction = this.isDec ? 1 : -1;
 
    this.allBooks.sort(function(a, b){
      if(a[property] < b[property]){
        return -1 * direction;
      }
      else if(a[property]>b[property]){
        return 1*direction;
      }
      else{
        return 0;
      }
    });
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
        this.filteredBooks = this.allBooks;
    }, error => this.messageService.showErrorMessage('Błąd podczas dodawania'));
  }
 
  deleteBook(book:Book):void{
    this.booksService.deleteBookById(book.bookId).subscribe( (data) => {
      this.getBooks();
      this.messageService.showSuccessMessage('Usunięto pomyślnie.')
    }, error => this.messageService.showErrorMessage('Błąd podczas usuwania.'));
  }
 
 
  filterBooks(){
    if(this.filter) {
      this.filteredBooks = this.filterPipe.transform(this.allBooks, this.filter);      
      this.allBooks = this.filteredBooks;
    }
    else {
      this.getBooks();
    }
  }
 
  isInvalid(){
    return isNullOrUndefined(this.bookToAdd.authors) || this.bookToAdd.authors.length == 0 ||
      isNullOrUndefined(this.bookToAdd.year) || isNullOrUndefined(this.bookToAdd.pages < 0);
  }
 
}