import { createSelector } from '@ngrx/store';
import { RootState } from '../index';
import { State } from './reducer';

export const selectDetail = (state: RootState) => state.detail;

export const selectDetailIsFetching = createSelector(selectDetail, (state: State) => state.isFetching);
export const selectMovieDetail = createSelector(selectDetail, (state: State) => state.data);
