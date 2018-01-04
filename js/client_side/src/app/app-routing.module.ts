import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksComponent} from './books/books.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {AuthorDetailsComponent} from './author-details/author-details.component';
import {AuthorsComponent} from './authors/authors.component';


const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors/:id',  component: AuthorDetailsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
