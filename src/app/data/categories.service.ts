import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';


import { Category } from './category';

const L1Categories : Category[] = [
  new Category('Baby & Spielzeug'),
  new Category('Baumarkt & Garten'),
  new Category('Computer & Elektronik'),
  new Category('Medien & Unterhaltung'),
  new Category('Mode & Accessoires'),
  new Category('Schönheit & Gesundheit'),
  new Category('Sport & Freizeit'),
  new Category('Wohnen & Haushalt')
];

@Injectable()
export class CategoriesService {


  getCategoriesTree () : Observable<Category[]> {
    return Observable.from(L1Categories).toArray();
  }
}
