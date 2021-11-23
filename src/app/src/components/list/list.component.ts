import {Component} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription
} from "rxjs";
import {GithubSearchService} from "../../services/github-search.service";
import {GithubRepo} from "../../interfaces/github-repo";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  isLoading$: BehaviorSubject<boolean>;
  values$: Observable<GithubRepo[]>;
  subscription: Subscription | undefined;

  constructor(private githubSearch: GithubSearchService) {
    this.isLoading$ = this.githubSearch.isLoading$;
    this.values$ = this.githubSearch.items$;
  }

}
