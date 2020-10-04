import { Actions, GET_MOVIE_DETAIL_FAILURE, GET_MOVIE_DETAIL_REQUEST, GET_MOVIE_DETAIL_SUCCESS } from './actions';
import MovieDetail from 'src/app/models/MovieDetail';

export interface State {
  isFetching: boolean;
  data?: MovieDetail;
  error?: any;
}

export const initialState: State = {
  isFetching: false,
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case GET_MOVIE_DETAIL_REQUEST: {
      return {
        ...state,
        data: undefined,
        isFetching: true,
      };
    }

    case GET_MOVIE_DETAIL_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.response,
      };
    }

    case GET_MOVIE_DETAIL_FAILURE: {
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
