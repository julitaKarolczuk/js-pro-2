import { Component, OnInit } from '@angular/core';
import {Author} from '../model/author';
import {ActivatedRoute} from "@angular/router";
import {AuthorsService} from "../service/authors.service";
import {CustomMessageService} from "../service/custom-message.service";

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})

export class AuthorDetailsComponent implements OnInit {

  author: Author = new Author();

  editedAuthor = new Author();

  authorId: number;

  constructor(private route: ActivatedRoute, private authorsService: AuthorsService, private messageService: CustomMessageService) { }

  ngOnInit() {
    this.authorId = +this.route.snapshot.paramMap.get('id');
    this.getAuthor();
  }

  getAuthor(){
    this.authorsService.getAuthorById(this.authorId).subscribe(author =>{
      this.author = author;
      this.editedAuthor = Author.clone(this.author);
    });
  }

  updateAuthor(){
    this.authorsService.updateAuthor(this.authorId, this.editedAuthor).subscribe(success => {
      this.author = success as Author;
      this.editedAuthor = Author.clone(this.author);
      this.messageService.showSuccessMessage('Zaktualizowano pomyślnie');
    }, error => this.messageService.showErrorMessage('Błąd podczas aktualizacji'));
  }

}
