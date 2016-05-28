import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, Request} from 'angular2/http';
import 'rxjs/add/operator/map';
import {AppConfig} from '../../config/config.js'
/*
  Generated class for the Bonami provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BonamiService {
  static get parameters(){
    return [[Http], [AppConfig]]
  }

  constructor(http, appConfig) {
    this.http = http;
    this.data = null;
    this.config = appConfig;
  }

  //http call to Bonami for list of available Newsletters
  // return empty list when the connection is unavailable
  getHeaders(){
    let reqHeaders = new Headers({ 'Accept-Language': this.config.appConfig.lang });
    return new RequestOptions({ headers: reqHeaders });
  }
  getNewslettersList(){
    return this.http.get(this.config.getApiUrl('newsletters'), this.getHeaders());
  }

  getNewsletter(id){
    let url = this.config.getApiUrl('newsletterById').replace(":id", id);
    return this.http.get(url, this.getHeaders());
  }

  getMagazineArticleList(){
    // let reqHeaders = new Headers({ 'Accept-Language': 'sk'});
    // let options = new RequestOptions({ headers: reqHeaders });
    return this.http.get(this.config.getApiUrl('magazines'), this.getHeaders());
  }

  getMagazineArticle(id){
    let url = this.config.getApiUrl('magazineArticleById').replace(":id", id);
    return this.http.get(url, this.getHeaders());
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=4aa883f95999ec813b8bfaf319f3972b')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        }, err => {console.error("Error fetching remote data.", err);}
      );
    });
  }
}
