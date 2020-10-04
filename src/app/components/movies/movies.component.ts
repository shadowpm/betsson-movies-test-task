import { Component, OnDestroy, OnInit } from '@angular/core';
import Movie from 'src/app/models/Movie';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { takeUntil } from 'rxjs/operators';
import { selectIfShowLoadMore, selectMovies, selectSearchIsFetching } from 'src/app/store/search/selectors';
import { SearchMoviesLoadNextPageAction } from 'src/app/store/search/actions';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies$: Observable<Movie[]>;
  isFetching$: Observable<boolean>;
  isLoadMoreButtonVisible$: Observable<boolean>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.isFetching$ = this.store.select(selectSearchIsFetching).pipe(takeUntil(this.ngUnsubscribe));
    this.movies$ = this.store.select(selectMovies).pipe(takeUntil(this.ngUnsubscribe));
    this.isLoadMoreButtonVisible$ = this.store.select(selectIfShowLoadMore).pipe(takeUntil(this.ngUnsubscribe));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadMore(): void {
    this.store.dispatch(new SearchMoviesLoadNextPageAction());
  }
}
