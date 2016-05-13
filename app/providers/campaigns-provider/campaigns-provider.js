import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CampaignsProvider {
  static get parameters(){
    return [[Http]]
  }

  constructor(http) {
    this.http = http;
    this.data = null;
  }

  loadCampaingList(page, limit, link) {

    var baseUrl = 'https://www.bonami.cz/mcc16/campaigns';
    // var URL = baseUrl + '?page=' + page + '&limit=' + limit;

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get(baseUrl)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

