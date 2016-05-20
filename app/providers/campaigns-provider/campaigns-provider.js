import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
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
			// Add accept-language header - bonami doesn't respond to en-US
			var h = new Headers();
			h.append('accept-language', 'cs'); //TODO check if phone is in sk
			console.log('headers', h);
			this.http.get(baseUrl, {headers: h})
				.map(res => res.json())
				.subscribe(data => {
					this.data = data;
					resolve(this.data);
				},err => console.log('error!', err));
		});
	}
}

