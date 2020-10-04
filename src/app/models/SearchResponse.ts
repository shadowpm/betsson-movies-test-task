import Movie from './Movie';

interface SearchResponse {
  Response: string;
  Search: Movie[];
  totalResults: string;
}

export default SearchResponse;
