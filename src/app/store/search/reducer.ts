import {
  Actions,
  SEARCH_MOVIES_FAILURE,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_SUCCESS_NEXT_PAGE,
} from './actions';
import SearchResponse from 'src/app/models/SearchResponse';

export interface State {
  isFetching: boolean;
  term?: string;
  response?: SearchResponse;
  error?: any;
}

export const initialState: State = {
  isFetching: false,
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case SEARCH_MOVIES_REQUEST: {
      return {
        ...state,
        isFetching: true,
        term: action.term,
      };
    }

    case SEARCH_MOVIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    }

    case SEARCH_MOVIES_SUCCESS_NEXT_PAGE: {
      return {
        ...state,
        isFetching: false,
        response: { ...state.response, Search: [...state.response.Search, ...action.response.Search] },
      };
    }

    case SEARCH_MOVIES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
