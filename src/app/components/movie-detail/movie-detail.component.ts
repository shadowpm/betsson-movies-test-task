import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { GetMovieDetailAction } from 'src/app/store/detail/actions';
import { selectDetailIsFetching, selectMovieDetail } from 'src/app/store/detail/selectors';
import MovieDetail from 'src/app/models/MovieDetail';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie: MovieDetail;
  isFetching$: Observable<boolean>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private store: Store<RootState>, private location: Location) {}

  ngOnInit(): void {
    this.getMovieDetail();
    this.store
      .select(selectMovieDetail)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(movie => (this.movie = movie));
    this.isFetching$ = this.store.select(selectDetailIsFetching).pipe(takeUntil(this.ngUnsubscribe));
  }

  getMovieDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetMovieDetailAction(id));
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
