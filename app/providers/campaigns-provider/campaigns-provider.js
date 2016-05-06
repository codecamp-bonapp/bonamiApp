import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CampaignsProvider {
  static get parameters(){
    return [[Http]]
  }

  constructor(http) {
    this.http = http;
    this.data = null;
  }

  loadCampaingList(page, limit, link) {

    // provisional promise insted API call
    return new Promise(resolve => {
      this.data =
      {
        "campaigns": [
          {
            "niceURL": "teebooks-police",
            "name": "Neviditelné police Teebooks",
            "endAt": "2016-08-28T23:59:59+0000",
            "perex": "Jako kdyby knihy levitovaly ve vzduchu!",
            "description": "Nebudete možná věřit vlastním očím, ale Teebooks jsou neviditelné poličky, které udrží všechny knihy, sešity i cédéčka a nedají to na sobě ani trochu znát. A tak máte pocit, že vaše milované věci levitují ve vzduchu!",
            "authorTitle": "Karel Vomáčka",
            "authorDescription": "Krátký textím (citace) od autora kampaně",
            "productCount": 34,
            "images": {
              "homepage-lowres": "https://1.bonami.cz/images/campaigns/homepage_screen/lowres-18780-teebooks-police.jpeg",
              "homepage-main": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
              "homepage-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/narrow-18780-teebooks-police.jpeg",
              "homepage-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/retina-18780-teebooks-police.jpeg",
              "author": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
            }
          },
          {
            "niceURL": "webtapetti-barevne-koberce",
            "name": "Pestrobarevné koberce",
            "endAt": "2016-08-28T23:59:59+0000",
            "perex": "Kouskům Webtapetti to bude u vás doma slušet!",
            "description": "Jsou moderní, krásné, a září všemi barvami duhy! Koberce Webtapetti si zamilujete - jednotlivé kolekce se totiž nechaly inspirovat přístupy a myšlenkami slavných umělců, a tak před sebou máte dokonalé obrazy převedené do praktické a měkoučké formy.",
            "authorTitle": "Karel Tapeta",
            "authorDescription": "Krátký textím (citace) od autora kampaně",
            "productCount": 28,
            "images": {
              "homepage-lowres": "https://1.bonami.cz/images/campaigns/homepage_screen/lowres-18764-webtapetti-barevne-koberce.jpeg",
              "homepage-main": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18900-smaltovane-hrnky-tinman.jpeg",
              "homepage-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen_main/thumb-18764-webtapetti-barevne-koberce.jpeg",
              "homepage-retina": "https://1.bonami.cz/images/campaigns/homepage_screen_main/retina-18764-webtapetti-barevne-koberce.jpeg",
              "author": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18900-smaltovane-hrnky-tinman.jpeg"
            }
          },
                    {
            "niceURL": "teebooks-police",
            "name": "Neviditelné police Teebooks",
            "endAt": "2016-08-28T23:59:59+0000",
            "perex": "Jako kdyby knihy levitovaly ve vzduchu!",
            "description": "Nebudete možná věřit vlastním očím, ale Teebooks jsou neviditelné poličky, které udrží všechny knihy, sešity i cédéčka a nedají to na sobě ani trochu znát. A tak máte pocit, že vaše milované věci levitují ve vzduchu!",
            "authorTitle": "Karel Vomáčka",
            "authorDescription": "Krátký textím (citace) od autora kampaně",
            "productCount": 34,
            "images": {
              "homepage-lowres": "https://1.bonami.cz/images/campaigns/homepage_screen/lowres-18780-teebooks-police.jpeg",
              "homepage-main": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
              "homepage-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/narrow-18780-teebooks-police.jpeg",
              "homepage-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/retina-18780-teebooks-police.jpeg",
              "author": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
            }
          },
          {
            "niceURL": "webtapetti-barevne-koberce",
            "name": "Pestrobarevné koberce",
            "endAt": "2016-08-28T23:59:59+0000",
            "perex": "Kouskům Webtapetti to bude u vás doma slušet!",
            "description": "Jsou moderní, krásné, a září všemi barvami duhy! Koberce Webtapetti si zamilujete - jednotlivé kolekce se totiž nechaly inspirovat přístupy a myšlenkami slavných umělců, a tak před sebou máte dokonalé obrazy převedené do praktické a měkoučké formy.",
            "authorTitle": "Karel Tapeta",
            "authorDescription": "Krátký textím (citace) od autora kampaně",
            "productCount": 28,
            "images": {
              "homepage-lowres": "https://1.bonami.cz/images/campaigns/homepage_screen/lowres-18764-webtapetti-barevne-koberce.jpeg",
              "homepage-main": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18900-smaltovane-hrnky-tinman.jpeg",
              "homepage-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen_main/thumb-18764-webtapetti-barevne-koberce.jpeg",
              "homepage-retina": "https://1.bonami.cz/images/campaigns/homepage_screen_main/retina-18764-webtapetti-barevne-koberce.jpeg",
              "author": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18900-smaltovane-hrnky-tinman.jpeg"
            }
          }
        ],
        "links": {
          "prev": "/campaigns",
          "next": "/campaigns/?page=2&limit=20"
        }
      };
      resolve(this.data);
    });


    var baseUrl = 'http://www.bonami.cz/mcc16api/campaigns/';
    var URL = baseUrl + '?page=' + page + '&limit=' + limit;

    // original load function

    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

