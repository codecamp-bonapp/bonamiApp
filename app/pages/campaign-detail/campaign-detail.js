import {Page, NavController, NavParams} from 'ionic-angular';
import {ProductDetailPage} from '../product-detail/product-detail';
import {Money} from '../../pipes/price-pipe';
import {Translate} from '../../pipes/translate';
import {TimeLeft} from '../../pipes/time-left-pipe';

@Page({
	templateUrl: 'build/pages/campaign-detail/campaign-detail.html',
	pipes: [Money, TimeLeft, Translate]
})
export class CampaignDetailPage {
	static get parameters() {
		return [[NavController], [NavParams]];
	}

	constructor(nav, params) {
		this.nav = nav;
		this.params = params;
		this.campaign = this.params.get('campaign');
		this.ProductProvider = this.params.get('ProductProvider');

		// get product list from api
		var promise = this.ProductProvider.loadProducts(this.campaign.niceUrl);
		promise.then((response) => {this.products = response.data});
	}

	showProduct(product){
		this.nav.push(ProductDetailPage, {product : product});
	}

	// redirect to an external web (bonami.cz)
	redirect(url) {
		window.open(url, '_system', 'location=yes');
	}

	doInfinite(infiniteScroll) {
		setTimeout( () => {
		var promise = this.ProductProvider.loadProducts(this.campaign.niceUrl);
		promise.then((response) => {
			this.products = response.data;
			if (response.next != 'END') {
				infiniteScroll.complete();
			} else {
				infiniteScroll.enable(false);
			}
		});
		}, 600);
	}

}
