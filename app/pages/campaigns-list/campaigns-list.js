import {Page, NavController} from 'ionic-angular';
import {CampaignsListProvider} from '../../providers/campaigns-list-provider/campaigns-list-provider';
import {CampaignDetailPage} from '../campaign-detail/campaign-detail';

@Page({
  templateUrl: 'build/pages/campaigns-list/campaigns-list.html',
  providers: [CampaignsListProvider]
})
export class CampaignsListPage {
  static get parameters() {
    return [[NavController], [CampaignsListProvider]];
  }

  constructor(nav, CampaignsProvider) {
    this.nav = nav;
    this.CampaignsProvider = CampaignsProvider;

    // LIMIT - limit of results returned from api
    this.limit = 10;
    // link to next list of campaigns
    this.next = "";
    this.page = 1;

    // get campaigns list from api
    var promise = this.CampaignsProvider.load(this.page, this.limit, this.next);
    promise.then((data) => {
      this.campaigns = data.campaigns;
      this.links = data.links;
    });
  }

  showCampaign(niceUrl){
    this.nav.push(CampaignDetailPage, {niceUrl : niceUrl});
  }
}
