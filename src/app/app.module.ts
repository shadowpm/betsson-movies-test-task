import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import StoreMainModule from './store/store.module';
import { AppSharedModule } from './app-shared.module';

@NgModule({
  declarations: [AppComponent, MoviesComponent, MovieCardComponent, SearchFieldComponent, MovieDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, StoreMainModule, AppSharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
