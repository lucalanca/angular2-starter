import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';


import { Http, Response } from '@angular/http';


import {
  SearchResultItem,
  ProductSearchResultItem,
  CategorySearchResultItem
} from './search';

const mockedSearchResult = {"items":[{"type":"suggest-product","data":{"name":"Apple iPad Air 2 16GB WiFi Gold","value":"Apple iPad Air 2 16GB WiFi Gold","price":"489.00","formatted_price":"ab CHF 489.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-air-2-16gb-wifi-gold-288607","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/515914807fd921eeef801b13f6fe3d77.48x48.jpg","abstract_sku":"288607-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Air 2 64GB WiFi Silber","value":"Apple iPad Air 2 64GB WiFi Silber","price":"599.00","formatted_price":"ab CHF 599.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-air-2-64gb-wifi-silber-288129","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/dcd598d6959f9557c33128d7a7e751c9.48x48.jpg","abstract_sku":"288129-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Air 9.7\u0022 16GB Cellular silber","value":"Apple iPad Air 9.7\u0022 16GB Cellular silber","price":"499.00","formatted_price":"ab CHF 499.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-air-97-16gb-cellular-silber-268788","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/52618b5f6a963946c56023cde3e76097.48x48.jpg","abstract_sku":"268788-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Pro 32GB Gold","value":"Apple iPad Pro 32GB Gold","price":"659.00","formatted_price":"ab CHF 659.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-pro-32gb-gold-318459","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/18fdf0af436655a79e0c14326c70a701.48x48.jpg","abstract_sku":"318459-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Pro 32GB Spacegrey","value":"Apple iPad Pro 32GB Spacegrey","price":"849.00","formatted_price":"ab CHF 849.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-pro-32gb-spacegrey-298568","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/f6ef3d95a6449dc736ba6609742f983b.48x48.jpg","abstract_sku":"298568-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Pro 128GB Gold","value":"Apple iPad Pro 128GB Gold","price":"829.00","formatted_price":"ab CHF 829.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-pro-128gb-gold-330488","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/c634b8509d401b9a436c0cb22261990b.48x48.jpg","abstract_sku":"330488-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Air 32GB Cellular Spacegrau","value":"Apple iPad Air 32GB Cellular Spacegrau","price":"549.00","formatted_price":"ab CHF 549.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-air-32gb-cellular-spacegrau-268781","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/7610c585a48eb3d3d19dcc978477dec1.48x48.jpg","abstract_sku":"268781-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Pro 128GB Gold","value":"Apple iPad Pro 128GB Gold","price":"969.00","formatted_price":"ab CHF 969.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-pro-128gb-gold-318533","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/586a6797fdc6f76e41b100c1b9cb3413.48x48.jpg","abstract_sku":"318533-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Pro 128GB Gold","value":"Apple iPad Pro 128GB Gold","price":"979.00","formatted_price":"ab CHF 979.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-pro-128gb-gold-298581","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/0971260aeee60367854470fed03e9e91.48x48.jpg","abstract_sku":"298581-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-product","data":{"name":"Apple iPad Pro 128GB Silver","value":"Apple iPad Pro 128GB Silver","price":"979.00","formatted_price":"ab CHF 979.00","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet\/apple-ipad-pro-128gb-silver-318609","image_url":"https:\/\/cdn.siroop.ch\/media\/images\/sized\/de3991fe88354f28456e4f2889fbc52b.48x48.jpg","abstract_sku":"318609-1","merchant_name":"Brack.ch AG","brand_name":"Apple","category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet"}},{"type":"suggest-category","data":{"name":"Smartwatch Zubeh\u00f6r","label":"%queryString% in %categoryName% %productCount%","url":"\/computer-elektronik\/smartwatch-wearables\/smartwatch-zubehoer?q=appl","product_count":43,"category_path":"Computer \u0026 Elektronik \/ Smartwatch \u0026 Wearables \/ Smartwatch Zubeh\u00f6r","queryString":"appl"}},{"type":"suggest-category","data":{"name":"iPad \u0026 Tablet","label":"%queryString% in %categoryName% %productCount%","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet?q=appl","product_count":140,"category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet","queryString":"appl"}},{"type":"suggest-category","data":{"name":"iPad \u0026 Tablet Schutzh\u00fclle","label":"%queryString% in %categoryName% %productCount%","url":"\/computer-elektronik\/computer-tablets\/ipad-tablet-schutzhuelle?q=appl","product_count":149,"category_path":"Computer \u0026 Elektronik \/ Computer \u0026 Tablets \/ iPad \u0026 Tablet Schutzh\u00fclle","queryString":"appl"}}],"summary":{"text":"Alle 739 Produkte anzeigen","num_total_results":739,"query":"appl"}};

@Injectable()
export class SearchService {
  constructor(private http: Http) {}


  search (query: string) : Observable<SearchResultItem[]> {
    console.log('searching for', query);
    if (query === "") {
      Observable.from([]).toArray();
    }
    const items : SearchResultItem[] = this.transformRawSearchData(mockedSearchResult);
    return Observable.from(items).toArray();
  }

  searchForReal (query: string) : Observable<SearchResultItem[]>{
    return this.http.get(`https://siroop.ch/search-suggestions?q=${query}`)
      .map((res: Response) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error('Response status: ' + res.status);
        }
        return res.json();
      })
      .map(this.transformRawSearchData);

  }

  private transformRawSearchData (rawSearchData: any): SearchResultItem[] {
    console.log('transformRawSearchData', rawSearchData);
    return mockedSearchResult.items.map((item: any) : SearchResultItem => {
      if (item.type === 'suggest-product') {
        return new ProductSearchResultItem(
          item.data.name,
          item.data.value,
          item.data.price,
          item.data.formatted_price,
          item.data.url,
          item.data.image_url,
          item.data.abstrat_sku,
          item.data.merchant_name,
          item.data.brand_name,
          item.data.category_path
        );
      }
      return new CategorySearchResultItem(
        item.data.name,
        item.data.url,
        item.data.product_count,
        item.data.category_path
      );
    })
  }
}
