export class SearchResultItem {
  constructor(public type: string) {}
}

export class ProductSearchResultItem extends SearchResultItem {
  constructor(public name: string,
              public value: string,
              public price: string,
              public formatted_price: string,
              public url: string,
              public image_url: string,
              public abstrat_sku: string,
              public merchant_name: string,
              public brand_name: string,
              public category_path: string) {
    super('suggest-product');
  }
}

export class CategorySearchResultItem extends SearchResultItem {
  constructor(public name: string,
              public url: string,
              public product_count: number,
              public category_path: string) {
    super('suggest-category');
  }
}
