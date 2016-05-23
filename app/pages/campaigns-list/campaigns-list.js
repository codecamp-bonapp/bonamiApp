import {Page, NavController} from 'ionic-angular';
import {CampaignsProvider} from '../../providers/campaigns-provider/campaigns-provider';
import {ProductProvider} from '../../providers/product-provider/product-provider';
import {CampaignDetailPage} from '../campaign-detail/campaign-detail';

@Page({
	templateUrl: 'build/pages/campaigns-list/campaigns-list.html',
	providers: [CampaignsProvider, ProductProvider]
})
export class CampaignsListPage {
	static get parameters() {
		return [[NavController], [CampaignsProvider], [ProductProvider]];
	}

	constructor(nav, CampaignsProvider, ProductProvider) {
		this.nav = nav;
		this.CampaignsProvider = CampaignsProvider;
		this.ProductProvider = ProductProvider;

		// get campaigns list from api
		var promise = this.CampaignsProvider.loadCampaigns();
		promise.then((response) => {this.campaigns = response.data});
	}

	showCampaign(campaign){
		this.nav.push(CampaignDetailPage, {campaign : campaign, ProductProvider: this.ProductProvider});
	}

	doInfinite(infiniteScroll) {
		var promise = this.CampaignsProvider.loadCampaings();
		promise.then((response) => {
			this.campaigns = response.data;
			if (response.next != 'END') {
				infiniteScroll.complete();
			} else {
				infiniteScroll.enable(false);
			}
		});
	}

}
