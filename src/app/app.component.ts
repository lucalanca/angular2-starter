/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';

import { Category } from './data/category';
import { CategoriesService } from './data/categories.service';

import {
  SearchResultItem,
  ProductSearchResultItem,
  CategorySearchResultItem
} from './data/search';
import { SearchService } from './data/search.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ CategoriesService, SearchService ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('../assets/scss/main.scss')
  ],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <button md-button router-active [routerLink]=" ['Index'] ">
            Index
          </button>
          <button md-button router-active [routerLink]=" ['Home'] ">
            Home
          </button>
          <button md-button router-active [routerLink]=" ['About'] ">
            About
          </button>
      </md-toolbar>
      <ul>
        <li *ngFor="let category of categories | async">
          {{ category.name }}
        </li>
      </ul>
      <input type="search" #term type="text" (keyup)="search(term.value)" />
      <ul>
        <li *ngFor="let searchResultItem of searchResultItems | async">
          <pre>{{ searchResultItem | json }}</pre>
        </li>
      </ul>
      <ul>
        <li *ngFor="let searchResultItem of searchResultItems2 | async">
          <pre>{{ searchResultItem | json }}</pre>
        </li>
      </ul>



      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

      <router-outlet></router-outlet>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

      <footer>
        <img [src]="angularclassLogo" width="6%">
        WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a>
      </footer>
      </md-content>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  categories        : Observable<Category[]>;
  searchResultItems : Observable<SearchResultItem[]>;
  searchResultItems2: Observable<SearchResultItem[]>;

  constructor(
    public appState: AppState,
    private categoriesService: CategoriesService,
    private searchService: SearchService) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.categories = this.categoriesService.getCategoriesTree();
    this.categoriesService.getCategoriesTree().subscribe((result) => {
      console.log('result', result);
    })
  }

  search (term) {
    this.searchResultItems = this.searchService.search(term);

    this.searchResultItems.subscribe((foo: any) => console.log('received, ', foo));

    this.searchResultItems2 = this.searchService.searchForReal(term);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
