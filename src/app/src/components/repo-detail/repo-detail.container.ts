import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {GithubSearchService} from "../../services/github-search.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {GithubRepoDetail} from "../../interfaces/github-repo-detail";

@Component({
  selector: 'app-repo-detail',
  template: `
    <app-repo-detail-dumb
      [item]="item$ | async"
    ></app-repo-detail-dumb>

    <app-loader
      [isLoading]="isLoading$ | async"
    ></app-loader>
  `
})
export class RepoDetailContainer implements OnInit {
  item$?: Observable<GithubRepoDetail>;
  isLoading$: BehaviorSubject<boolean>;

  constructor(
    private githubSearch: GithubSearchService,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = githubSearch.isLoading$;
  }

  ngOnInit(): void {
    this.item$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.githubSearch.searchById(params.get('id')!))
    );
  }

}
