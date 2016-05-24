import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

@Injectable()
export class CampaignsProvider {
	static get parameters() {return [[Http]]}

	constructor(http) {
		this.http = http;
		this.data = null;
		this.next = null;
	}

	loadCampaigns() {
		var getNextCampaignsUrl = () => {
			if (this.next) return this.next;
			return '/mcc16/campaigns';
		};

		var url = getNextCampaignsUrl();
		if (url == 'END') return Promise.resolve({data: this.data, next: this.next});

		return new Promise(resolve => {
			var headers = new Headers();
			headers.append('accept-language', 'cs'); // TODO check if phone is in sk

			this.http.get('https://www.bonami.cz' + url, {headers: headers})
				.subscribe(res => {
					var newData = res.json();
					for(var i = 0, len = newData.length; i < len; i++) {
						newData[i].longTerm = Math.floor(((+(new Date(newData[i].endAt)) - Date.now()) / 86400000)) > 12;
					}

					if (_.isEmpty(newData)) {
						this.next = 'END';
						return resolve({data: this.data, next: this.next});
					}
					var oldData = this.data || [];
					this.data = oldData.concat(newData);

					try {
						var link = JSON.parse(res.headers.get('link'));
						this.next = link.href;
					} catch (err) {
						this.next = 'END';
					}

					resolve({data: this.data, next: this.next});
				}, err => console.log('error!', err));
		});
	}
}

