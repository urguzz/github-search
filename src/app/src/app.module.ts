import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {ListComponent} from './components/list/list.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RepoInfoComponent} from './components/repo-info/repo-info.component';
import {RouterModule} from "@angular/router";
import {RepoDetailComponent} from './components/repo-detail/repo-detail.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoaderComponent} from './components/loader/loader.component';
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RepoInfoComponent,
    RepoDetailComponent,
    LoaderComponent,
    SearchBarComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'search', component: ListComponent},
      {path: 'repos/:id', component: RepoDetailComponent},
      {path: '**', redirectTo: 'search'},
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
