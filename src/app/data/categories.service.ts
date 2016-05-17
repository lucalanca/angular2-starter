import { Injectable } from '@angular/core';

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


  getCategoriesTree () : Category[] {
    return L1Categories;
  }
}
