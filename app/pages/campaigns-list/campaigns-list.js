import {Page, NavController} from 'ionic-angular';
import {CampaignsProvider} from '../../providers/campaigns-provider/campaigns-provider';
import {CampaignDetailPage} from '../campaign-detail/campaign-detail';

@Page({
  templateUrl: 'build/pages/campaigns-list/campaigns-list.html',
  providers: [CampaignsProvider],
})
export class CampaignsListPage {
  static get parameters() {
    return [[NavController], [CampaignsProvider]];
  }

  constructor(nav, CampaignsProvider) {
    this.nav = nav;
    this.CampaignsProvider = CampaignsProvider;

    this.limit = 10; // LIMIT - limit of results returned from api
    this.next = ""; // link to next list of campaigns
    this.page = 1;

    // get campaigns list from api
    var promise = this.CampaignsProvider.loadCampaingList(this.page, this.limit, this.next);
    promise.then((data) => {
      this.campaigns = data;
      this.links = [];
    });
  }

  showCampaign(campaign){
    this.nav.push(CampaignDetailPage, {campaign : campaign});
  }
}
