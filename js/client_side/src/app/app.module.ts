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
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {DataTableModule, InputTextModule, PaginatorModule, SharedModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FilterByTitlePipe } from './pipe/filter-by-title.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailsComponent,
    AuthorsComponent,
    AuthorDetailsComponent,
    FilterByTitlePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    BrowserAnimationsModule,
    PaginatorModule
  ],
  providers: [
    HttpClientModule,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
