import {Injectable, Pipe} from 'angular2/core';
import {getLanguages} from '../languages';

@Pipe({
  name: 'translate'
})
@Injectable()
export class Translate {

  constructor() {
    // get language from localstorage
    this.language = localStorage.getItem('language') || 'cs';
    this.data = getLanguages();
  }

  transform(value, args) {

      return this.data[this.language][value] || value;
  }
}
