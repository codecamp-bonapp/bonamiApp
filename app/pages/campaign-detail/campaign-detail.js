import {Page, NavController, NavParams} from 'ionic-angular';
import {ProductProvider} from '../../providers/product-provider/product-provider';
import {ProductDetailPage} from '../product-detail/product-detail';

@Page({
  templateUrl: 'build/pages/campaign-detail/campaign-detail.html',
  providers: [ProductProvider],
})
export class CampaignDetailPage {
  static get parameters() {
    return [[NavController], [NavParams], [ProductProvider]];
  }

  constructor(nav, params, ProductProvider) {
    this.nav = nav;
    this.params = params;
    this.campaign = this.params.get("campaign");
    this.ProductProvider = ProductProvider;

    this.limit = 10; // limit of results returned from api
    this.next = ""; // link to next list of product

    // get product list from api
    var promise = this.ProductProvider.loadProducts(this.campaign.niceUrl, this.limit, this.next);
    promise.then((data) => {
      this.products = data.products;
      this.links = data.links;
    });
  }

  showProduct(product){
    this.nav.push(ProductDetailPage, {product : product});
  }

  redirect(url) {
    window.open(url, '_system', 'location=yes');
  }
}
