export interface GithubRepoDetail {
  id: number;
  name: string;
  owner: string;
  stars: number;
  forks: number;
  watchers: number;
  description: string;
  url: string;
  ownerId: number;
  creationDate: Date;
  updateDate: Date;
  language: string;
}
