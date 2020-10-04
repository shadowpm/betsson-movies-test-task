import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import SearchResponse from 'src/app/models/SearchResponse';
import MovieDetail from '../models/MovieDetail';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'http://www.omdbapi.com/';
  private apiKey = 'f79aeba3';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient, private messageService: MessageService) {}

  search(term: string, page: number = 1): Observable<SearchResponse> {
    if (!term.trim()) {
      return of({
        Response: 'False',
        Search: [],
        totalResults: '0',
      });
    }
    const params = new HttpParams().set('apiKey', this.apiKey).set('s', term).set('page', page.toString());
    return this.http
      .get<SearchResponse>(this.moviesUrl, { params })
      .pipe(
        // x = array of movies matching the search
        tap(x =>
          x.Search.length ? this.log(`found movies matching "${term}"`) : this.log(`no movies matching "${term}"`)
        ),
        catchError(
          this.handleError<SearchResponse>('searchMovie', {
            Response: 'False',
            Search: [],
            totalResults: '0',
          })
        )
      );
  }

  getMovieDetail(imdbId: string): Observable<MovieDetail> {
    const params = new HttpParams().set('apiKey', this.apiKey).set('plot', 'full').set('i', imdbId);
    return this.http
      .get<MovieDetail>(this.moviesUrl, { params })
      .pipe(
        tap(_ => this.log(`fetched movie detail id=${imdbId}`)),
        catchError(this.handleError<MovieDetail>(`getMovieDetail id=${imdbId}`))
      );
  }

  private log(message: string): void {
    this.messageService.add(`MovieService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed ${error.messages}`);

      return of(result as T);
    };
  }
}
