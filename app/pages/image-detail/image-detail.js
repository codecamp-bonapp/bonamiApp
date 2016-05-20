import {Page, NavController, NavParams, Slides} from 'ionic-angular';

@Page({
	templateUrl: 'build/pages/image-detail/image-detail.html',
})
export class ImageDetailPage {
	static get parameters() {
		return [[NavController], [NavParams]];
	}

	constructor(nav, params) {
		this.nav = nav;
		this.params = params;
		this.index = this.params.get('index');
		this.product = this.params.get('product');

		this.slideOptions = {
			initialSlide: this.index
		}
	}

	closeModal(){
		this.nav.pop();
	}
}
