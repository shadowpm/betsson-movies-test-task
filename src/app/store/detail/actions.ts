import { Action } from '@ngrx/store';
import MovieDetail from 'src/app/models/MovieDetail';

export const GET_MOVIE_DETAIL_REQUEST = '[Detail] get movie detail request';
export const GET_MOVIE_DETAIL_SUCCESS = '[Detail] get movie detail success';
export const GET_MOVIE_DETAIL_FAILURE = '[Detail] get movie detail failure';

export class GetMovieDetailAction implements Action {
  readonly type = GET_MOVIE_DETAIL_REQUEST;

  constructor(public imdbId: string) {}
}

export class GetMovieDetailSuccessAction implements Action {
  readonly type = GET_MOVIE_DETAIL_SUCCESS;

  constructor(public response: MovieDetail) {}
}

export class GetMovieDetailFailureAction implements Action {
  readonly type = GET_MOVIE_DETAIL_FAILURE;

  constructor(public error: any) {}
}

export type Actions = GetMovieDetailAction | GetMovieDetailSuccessAction | GetMovieDetailFailureAction;
