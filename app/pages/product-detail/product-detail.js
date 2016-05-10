import {Page, NavController, NavParams, Modal} from 'ionic-angular';
import {ImageDetailPage} from '../image-detail/image-detail';

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
    window.open(this.product.url, '_system', 'location=yes');
  }

  showImageDetail(index) {
    console.log("index", index);
    console.log("Modal", Modal);
    let modal = Modal.create(ImageDetailPage, {product: this.product, index: index});
    this.nav.present(modal);
  }
}
