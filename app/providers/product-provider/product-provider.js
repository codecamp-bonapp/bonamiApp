import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductProvider {
  static get parameters(){
    return [[Http]]
  }

  constructor(http) {
    this.http = http;
    this.data = null;
  }

  loadProducts(niceUrl, limit, next) {

    var baseUrl = 'https://www.bonami.cz/mcc16/campaigns/';
    var URL = baseUrl + niceUrl + '/products';

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get(URL)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

