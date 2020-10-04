import { Action } from '@ngrx/store';
import SearchResponse from 'src/app/models/SearchResponse';

export const SEARCH_MOVIES_REQUEST = '[Search] Search movies request';
export const SEARCH_MOVIES_REQUEST_NEXT_PAGE = '[Search] Search movies request next page';
export const SEARCH_MOVIES_SUCCESS = '[Search] Search movies success';
export const SEARCH_MOVIES_SUCCESS_NEXT_PAGE = '[Search] Search movies success next page';
export const SEARCH_MOVIES_FAILURE = '[Search] Search movies failure';

export class SearchMoviesAction implements Action {
  readonly type = SEARCH_MOVIES_REQUEST;

  constructor(public term: string) {}
}

export class SearchMoviesLoadNextPageAction implements Action {
  readonly type = SEARCH_MOVIES_REQUEST_NEXT_PAGE;
}

export class SearchMoviesSuccessAction implements Action {
  readonly type = SEARCH_MOVIES_SUCCESS;

  constructor(public response: SearchResponse) {}
}

export class SearchMoviesNextPageSuccessAction implements Action {
  readonly type = SEARCH_MOVIES_SUCCESS_NEXT_PAGE;

  constructor(public response: SearchResponse) {}
}

export class SearchMoviesFailureAction implements Action {
  readonly type = SEARCH_MOVIES_FAILURE;

  constructor(public error: any) {}
}

export type Actions =
  | SearchMoviesAction
  | SearchMoviesSuccessAction
  | SearchMoviesFailureAction
  | SearchMoviesLoadNextPageAction
  | SearchMoviesNextPageSuccessAction;
