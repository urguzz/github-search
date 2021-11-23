import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GithubRepo} from "../interfaces/github-repo";
import {
  map,
  EMPTY,
  BehaviorSubject,
  finalize,
  switchMap,
  debounceTime,
  tap,
  catchError,
  Observable,
  distinctUntilChanged,
  combineLatest, skip, filter,
} from "rxjs";
import {GithubRepoDetail} from "../interfaces/github-repo-detail";

@Injectable({
  providedIn: "root"
})
export class GithubSearchService {
  isLoading$ = new BehaviorSubject<boolean>(false);
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(30);
  items$ = new BehaviorSubject<GithubRepo[]>([]);
  numberOfElements$ = new BehaviorSubject<number>(0);

  private query: string = '';
  private prevQuery: string = '';
  private propagatePageChange: boolean = true;

  constructor(private http: HttpClient) {
    combineLatest([
      this.page$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(() => {
          if (this.propagatePageChange) {
            return true;
          }
          this.propagatePageChange = true;
          return false;
        })
      ),
      this.pageSize$.pipe(
        debounceTime(300),
        distinctUntilChanged())
    ]).pipe(
      skip(1),
      switchMap(() => this.search(this.query))
    ).subscribe();
  }

  search(query: string): Observable<GithubRepo[]> {
    this.query = query;
    if (this.prevQuery !== query) {
      this.prevQuery = query;
      this.propagatePageChange = false;
      this.page$.next(1);
    }

    this.isLoading$.next(true);
    const url =
      `https://api.github.com/search/repositories?q=${query}&page=${this.page$.value}&per_page=${this.pageSize$.value}`;
    return this.http.get<any>(url).pipe(
      tap((result) => this.numberOfElements$.next(result.total_count)),
      //tap((...args) => console.log('>', ...args)),
      map(result => result.items.map((item: any) => {
        const repo: GithubRepo = {
          id: item.id,
          name: item.name,
          owner: item.owner.login,
          stars: item.stargazers_count,
        }
        return repo;
      })),
      tap((items) => this.items$.next(items)),
      catchError(() => {
        this.items$.next([]);
        return EMPTY;
      }),
      finalize(() => {
        this.isLoading$.next(false);
        this.propagatePageChange = true;
      })
    );
  }

  searchById(id: string): Observable<GithubRepoDetail> {
    this.isLoading$.next(true);
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      }),
    };
    const url = `https://api.github.com/repositories/${id}`;
    return this.http.get<any>(url, requestOptions).pipe(
      map(item => {
        const repoDetail: GithubRepoDetail = {
          id: item.id,
          name: item.name,
          owner: item.owner.login,
          description: item.description,
          stars: item.stargazers_count,
          forks: item.forks,
          watchers: item.watchers,
          url: item.html_url,
          language: item.language,
          ownerId: item.owner.id,
          updateDate: new Date(item.updated_at),
          creationDate: new Date(item.created_at),
        }
        return repoDetail;
      }),
      finalize(() => this.isLoading$.next(false)),
      catchError(() => EMPTY),
    );
  }
}
