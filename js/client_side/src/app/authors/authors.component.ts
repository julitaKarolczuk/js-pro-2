import {Component, OnInit} from '@angular/core';
import {Author} from '../model/author';
import {AuthorsService} from '../service/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})

export class AuthorsComponent implements OnInit {

  allAuthors: Author[] = [];

  selectedAuthor: Author;

  onSelect(author: Author): void {
    this.selectedAuthor = author;
  }

  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.authorsService.getAllAuthors().subscribe(data => this.allAuthors = data, error => console.log("Wystąpił błąd"));
  }
}
