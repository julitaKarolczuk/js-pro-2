import {Component, OnInit, ViewChild} from '@angular/core';
import {Author} from '../model/author';
import {AuthorsService} from '../service/authors.service';
import {FormGroup} from "@angular/forms";
import {CustomMessageService} from "../service/custom-message.service";
import {FilterAuthorPipe} from "../pipe/filter-author.pipe";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [FilterAuthorPipe]
})

export class AuthorsComponent implements OnInit {

  allAuthors: Author[] = [];

  filteredAuthor: Author[] = [];

  authorToAdd: Author = new Author();

  pagedAuthors: Author [] = [];

  paginatorSettings = {rows: 2, pageLinkSize: 3, totalRecords: null};

  filter: string;

  @ViewChild('authorForm')
  authorForm : FormGroup;

  constructor(private authorsService: AuthorsService,
              private messageService: CustomMessageService,
              private filterAuthorPipe: FilterAuthorPipe) {
  }


  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorsService.getAllAuthors().subscribe(data => {
      this.allAuthors = data;
      this.pagedAuthors = this.allAuthors.slice(0, this.paginatorSettings.rows);
      this.setPaginatorSettings();
      this.filteredAuthor = this.allAuthors;
    }, error => console.log("Wystąpił błąd"));
  }

  createAuthor(){
    this.authorsService.createAuthor(this.authorToAdd).subscribe(success => {
      this.getAuthors();
      this.authorForm.reset();
      this.messageService.showSuccessMessage('Dodano pomyślnie');
    },
      error => this.messageService.showErrorMessage('Błąd podczas dodawania'));
  }

  setPaginatorSettings(totalRecords: number = this.allAuthors.length){
    this.paginatorSettings.totalRecords = totalRecords;
  }

  deleteAuthor(authorId: number){
    this.authorsService.deleteAuthorById(authorId).subscribe(success => {
        this.messageService.showSuccessMessage('Usunięto pomyślnie');
        this.getAuthors();
      },
      error => this.messageService.showErrorMessage('Błąd podczas usuwania.'));
  }

  filterKeyUp(){
    if(this.filter) {
      this.filteredAuthor = this.filterAuthorPipe.transform(this.allAuthors, this.filter);
      this.setPaginatorSettings(this.filteredAuthor.length);
      this.pagedAuthors = this.filteredAuthor.slice(0, this.paginatorSettings.rows);
    }
    else {
      this.setPaginatorSettings();
      this.pagedAuthors = this.allAuthors.slice(0, 2);
    }
  }

  paginate(event){
    this.filter ? this.pagedAuthors = this.filteredAuthor.slice(event.first, event.rows * (event.page + 1)) :
      this.pagedAuthors = this.allAuthors.slice(event.first, event.rows * (event.page + 1));
  }
}
