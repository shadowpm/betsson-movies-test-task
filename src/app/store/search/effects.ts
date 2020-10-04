import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { catchError, concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import {
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_REQUEST_NEXT_PAGE,
  SearchMoviesAction,
  SearchMoviesFailureAction,
  SearchMoviesNextPageSuccessAction,
  SearchMoviesSuccessAction,
} from './actions';
import { RootState } from '../index';
import { selectSearch } from './selectors';

@Injectable()
class SearchEffects {
  constructor(private actions$: Actions, private movieService: MovieService, private store$: Store<RootState>) {}

  @Effect()
  searchRequest$: Observable<Action> = this.actions$.pipe(
    ofType(SEARCH_MOVIES_REQUEST),
    map((action: SearchMoviesAction) => action.term),
    switchMap(term => {
      return this.movieService.search(term).pipe(
        map(response => new SearchMoviesSuccessAction(response)),
        catchError(error => of(new SearchMoviesFailureAction(error)))
      );
    })
  );

  @Effect()
  nextPageRequest$: Observable<Action> = this.actions$.pipe(
    ofType(SEARCH_MOVIES_REQUEST_NEXT_PAGE),
    concatMap(action => of(action).pipe(withLatestFrom(this.store$.select(selectSearch)))),
    map(([action, search]) => ({
      term: search.term,
      page:
        search.response.Search.length < +search.response.totalResults
          ? Math.floor(search.response.Search.length / 10) + 1
          : 1,
    })),
    switchMap(params => {
      return this.movieService.search(params.term, params.page).pipe(
        map(response => new SearchMoviesNextPageSuccessAction(response)),
        catchError(error => of(new SearchMoviesFailureAction(error)))
      );
    })
  );
}

export default SearchEffects;
