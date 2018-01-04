import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {BooksService} from '../service/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  allBooks: Book[]=[];

  selectedBook : Book;

  onSelect(book:Book): void {
    this.selectedBook = book;
  }

  deleteBook(book:Book):void{
    this.booksService.deleteBookById(book.bookId).subscribe( (data) => {console.log(data)}, error => console.log("blad"));
  }

  constructor (private booksService: BooksService) { 
	
  }

  ngOnInit() {
	  this.getBooks();
  }
  
  getBooks(){
	  this.booksService.getAllBooks().subscribe( data => this.allBooks = data, error => console.log("blad"));
  }

}
