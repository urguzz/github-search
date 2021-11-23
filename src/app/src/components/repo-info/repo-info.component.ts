import {Component, Input} from '@angular/core';
import {GithubRepo} from "../../interfaces/github-repo";

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.css']
})
export class RepoInfoComponent {
  @Input("item") item!: GithubRepo;

  constructor() {
  }
}
