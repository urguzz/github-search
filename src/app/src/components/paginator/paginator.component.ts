import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {BehaviorSubject} from "rxjs";
import {GithubSearchService} from "../../services/github-search.service";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  page$: BehaviorSubject<number>;
  pageSize$: BehaviorSubject<number>;
  numberOfElements$: BehaviorSubject<number>;

  constructor(private githubSearch: GithubSearchService) {
    this.page$ = this.githubSearch.page$;
    this.pageSize$ = this.githubSearch.pageSize$;
    this.numberOfElements$ = this.githubSearch.numberOfElements$;
  }

  handlePageChange(e: PageEvent) {
    this.page$.next(e.pageIndex + 1);
    this.pageSize$.next(e.pageSize);
  }
}
