import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductProvider {
	static get parameters() {return [[Http]]}

	constructor(http) {
		this.http = http;
		this.data = {};
		this.next = {};
	}

	loadProducts(niceUrl) {

		var getNextProducsUrl = () => {
			if (this.next[niceUrl]) return this.next[niceUrl];
			return '/mcc16/campaigns/' + niceUrl + '/products';
		}

		var url = getNextProducsUrl();
		if (url == 'END') return Promise.resolve({data: this.data[niceUrl], next: this.next[niceUrl]});

		return new Promise(resolve => {
			var headers = new Headers();
			headers.append('accept-language', 'cs'); // TODO check if phone is in sk

			this.http.get('https://www.bonami.cz' + url, {headers: headers})
				.subscribe(res => {
					var newData = res.json();
					if (_.isEmpty(newData)) {
						this.next[niceUrl] = 'END';
						return resolve({data: this.data[niceUrl], next: this.next[niceUrl]});
					}
					var oldData = this.data[niceUrl] || [];
					this.data[niceUrl] = oldData.concat(newData);

					try {
						var link = JSON.parse(res.headers.get('link'));
						this.next[niceUrl] = link.href;
					} catch (err) {
						this.next[niceUrl] = 'END';
					}

					resolve({data: this.data[niceUrl], next: this.next[niceUrl]});
				}, err => console.log('error!', err));
		});
	}
}

