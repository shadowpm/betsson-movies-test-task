import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import {
  GET_MOVIE_DETAIL_REQUEST,
  GetMovieDetailAction,
  GetMovieDetailFailureAction,
  GetMovieDetailSuccessAction,
} from './actions';

@Injectable()
class DetailEffects {
  constructor(private actions$: Actions, private movieService: MovieService) {}

  @Effect()
  searchRequest$: Observable<Action> = this.actions$.pipe(
    ofType(GET_MOVIE_DETAIL_REQUEST),
    map((action: GetMovieDetailAction) => action.imdbId),
    switchMap(imdbId => {
      return this.movieService.getMovieDetail(imdbId).pipe(
        map(response => new GetMovieDetailSuccessAction(response)),
        catchError(error => of(new GetMovieDetailFailureAction(error)))
      );
    })
  );
}

export default DetailEffects;
