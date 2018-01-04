import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from '../model/book';
import {BooksService} from '../service/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  allBooks: Book[]=[];
  pagedBooks: Book [];
  filteredBooks: Book[];

  filter: string = '';

  constructor (private booksService: BooksService) {

  }
  deleteBook(book:Book):void{
    this.booksService.deleteBookById(book.bookId).subscribe( (data) => {this.getBooks()}, error => console.log("blad"));
  }

  ngOnInit() {
	  this.getBooks();
  }

  getBooks(){
	  this.booksService.getAllBooks().subscribe( data => {
	    this.allBooks = data;
	    this.pagedBooks = this.allBooks.slice(0, 2);
    }, error => console.log("blad"));
  }

  paginate(event){
    !this.filter ? this.pagedBooks = this.filteredBooks.slice(event.first, event.rows * (event.page + 1)):
      this.pagedBooks = this.allBooks.slice(event.first, event.rows * (event.page + 1));
  }

}
