import { ActionReducerMap } from '@ngrx/store';
import * as searchReducer from './search/reducer';
import * as detailReducer from './detail/reducer';

export interface RootState {
  search: searchReducer.State;
  detail: detailReducer.State;
}

export const rootReducer: ActionReducerMap<RootState> = {
  search: searchReducer.reducer,
  detail: detailReducer.reducer,
};
