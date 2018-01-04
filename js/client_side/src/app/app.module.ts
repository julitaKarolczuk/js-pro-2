import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BooksService} from './service/books.service';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import {HttpClientModule} from "@angular/common/http";
 
 
@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailsComponent,
    AuthorsComponent,
    AuthorDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpClientModule,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 
}
