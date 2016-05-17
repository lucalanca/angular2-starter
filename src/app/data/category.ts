export class Category {
  constructor(public name: string,
              public children: Category[] = [],
              public parents: Category[] = []  ) {

  }
}
