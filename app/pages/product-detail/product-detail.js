import {Page, NavController, NavParams, Modal} from 'ionic-angular';
import {ImageDetailPage} from '../image-detail/image-detail';
import {Money} from '../../pipes/price-pipe';


@Page({
	templateUrl: 'build/pages/product-detail/product-detail.html',
	pipes: [Money]
})
export class ProductDetailPage {
	static get parameters() {
		return [[NavController], [NavParams]];
	}

	constructor(nav, params) {
		this.nav = nav;
		this.params = params;
		this.product = this.params.get("product");
		var diff = Math.floor((+(new Date(this.product.campaignEndAt)) - Date.now()) / 1000);
		this.product.campaignEndIn = {};
		this.product.campaignEndIn.days = Math.floor(diff / 86400);
		diff %= 86400;
		this.product.campaignEndIn.hours = Math.floor(diff / 3600);
		console.log(this.product);
	}

	// redirect to an external web (bonami.cz)
	redirect() {
		window.open(this.product.url, '_system', 'location=yes');
	}

	// open image slider
	showImageDetail(index) {
		let modal = Modal.create(ImageDetailPage, {product: this.product, index: index});
		this.nav.present(modal);
	}
}
