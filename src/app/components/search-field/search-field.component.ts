import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { SearchMoviesAction } from 'src/app/store/search/actions';
import { selectSearchTerm } from 'src/app/store/search/selectors';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  private searchTerms = new Subject<string>();
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  term = '';

  constructor(private store: Store<RootState>) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.store
      .select(selectSearchTerm)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(term => (this.term = term || ''));
    this.searchTerms
      .pipe(takeUntil(this.ngUnsubscribe), debounceTime(300), distinctUntilChanged())
      .subscribe((term: string) => {
        this.store.dispatch(new SearchMoviesAction(term));
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
