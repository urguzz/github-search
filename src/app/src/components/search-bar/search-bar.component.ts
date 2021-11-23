import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subscription, switchMap, tap} from "rxjs";
import {GithubSearchService} from "../../services/github-search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl: FormControl;
  subscription?: Subscription;

  constructor(
    private githubSearch: GithubSearchService,
    private router: Router
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.subscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.router.url !== '/search' &&
        this.router.navigate(['/search']);
      }),
      switchMap((query: string) => this.githubSearch.search(query)),
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
