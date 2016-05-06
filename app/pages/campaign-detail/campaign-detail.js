import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/campaign-detail/campaign-detail.html',
})
export class CampaignDetailPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {
    this.nav = nav;
    this.params = params;
    this.niceUrl = this.params.get("niceUrl");
  }
}
