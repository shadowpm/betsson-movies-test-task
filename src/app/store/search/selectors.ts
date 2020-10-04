import { createSelector } from '@ngrx/store';
import { RootState } from '../index';
import { State } from './reducer';

export const selectSearch = (state: RootState) => state.search;

export const selectSearchIsFetching = createSelector(selectSearch, (state: State) => state.isFetching);
export const selectMovies = createSelector(selectSearch, (state: State) => state.response?.Search);
export const selectSearchTerm = createSelector(selectSearch, (state: State) => state.term);
export const selectIfShowLoadMore = createSelector(
  selectSearch,
  (state: State) => state.response?.Search.length < +state.response?.totalResults
);
