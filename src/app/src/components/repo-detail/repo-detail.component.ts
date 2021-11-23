import {Component, Input} from '@angular/core';
import {GithubRepoDetail} from "../../interfaces/github-repo-detail";

@Component({
  selector: 'app-repo-detail-dumb',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.css']
})
export class RepoDetailComponent {
  @Input() item: GithubRepoDetail | null = null;
}
