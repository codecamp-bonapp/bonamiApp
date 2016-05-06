import {Page, NavController, NavParams} from 'ionic-angular';
import {ProductProvider} from '../../providers/product-provider/product-provider';

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
    this.niceUrl = this.params.get("niceUrl");
    this.ProductProvider = ProductProvider;

    this.limit = 10; // limit of results returned from api
    this.next = ""; // link to next list of product

    // get product list from api
    var promise = this.ProductProvider.loadProducts(this.niceUrl, this.limit, this.next);
    promise.then((data) => {
      console.log("data", data);
      this.product = data.product;
      this.links = data.links;
    });
  }
}
