import {Page, NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the ProductDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/product-detail/product-detail.html',
})
export class ProductDetailPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {
    this.nav = nav;
    this.params = params;
    this.product = this.params.get("product");
  }

  redirect() {
    console.log("this.product.url", this.product.url);
    window.open(this.product.url, '_system', 'location=yes');
  }
}
