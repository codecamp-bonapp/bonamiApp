import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductProvider {
  static get parameters(){
    return [[Http]]
  }

  constructor(http) {
    this.http = http;
    this.data = null;
  }

  loadProducts(niceUrl, limit, next) {
    // provisional promise insted API call
    return new Promise(resolve => {
      this.data =
      {
        "products": [
            {
                "niceUrl": "sada-dvou-neviditelny-polic-u-bile",
                "name": "Sada dvou neviditelných polic U, bílé",
                "description": "Nebudete možná věřit vlastním očím, ale Teebooks jsou neviditelné poličky, které udrží až 20 kg. Udrží všechny knihy, sešity i cédéčka a nedají to na sobě ani trochu znát. Jsou vyrobené z kvalitní 2 mm silné oceli a díky ukotvení pomocí vrutů a hmožděnek je žádná těžká váha nerozhodí. V sadě najdete hned dvě a to už je dost místa na vystavení všech vašich oblíbených (od této chvíle levitujících) knížek.",
                "brandName": "Teebooks",
                "price": 2999.00,
                "currency": "CZK",
                "retailPrice": 3459.00,
                "retailPriceCurrency": "CZK",
                "shippingPrice": 0.00,
                "shippingPriceCurrency": "CZK",
                "stockType": "available",
                "stockInfoText": "U vás doma 7. – 10. 6. 2016",
                "stockWarningText": "Posledních pár kusů",
                "campaignEndAt": "2016-08-28T23:59:59+0000",
                "url": "https://www.bonami.cz/p/sada-dvou-neviditelny-polic-u-bile",
                "properties": [
                    {
                        "name": "Barva",
                        "value": "Bílá"
                    },
                    {
                        "name": "Rozměry",
                        "value": "15 x 15 x 60 cm (hloubka x výška x šířka)"
                    },
                    {
                        "name": "Materíál",
                        "value": "kvalitní ocel (silná 2 mm)"
                    },
                    {
                        "name": "Nosnost",
                        "value": "až 20 kg"
                    },
                    {
                        "name": "Poznámka",
                        "value": "vruty a hmožděňky na připevnění jsou součástí balení"
                    }
                ],
                "images": [
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    },
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    },
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    }
                ]
            },
            {
                "niceUrl": "sada-dvou-neviditelnych-polic-udb",
                "name": "Sada dvou neviditelných polic UBD",
                "description": "Tváří se, že jsou neviditelné, ale ve skutečnosti unesou až 40 kg. Police Teebooks nejsou žádné sušinky, jejich pevné tělo je vyrobené z kvalitní oceli silné 2 mm a žádná těžká váha v podobě oblíbených knih pro ně není problém. Díky důmyslnému systému uchycení pomocí vrutů a hmožděnek doslova přirostou ke zdi a jakmile na ně vyskládáte oblíbené čtivo, už je nikdy nikdo nespatří a vaše knihy začnou levitovat.",
                "brandName": "Teebooks",
                "price": 3199.00,
                "currency": "CZK",
                "retailPrice": 3442.00,
                "retailPriceCurrency": "CZK",
                "shippingPrice": 0.00,
                "shippingPriceCurrency": "CZK",
                "stockType": "available",
                "stockInfoText": "U vás doma 7. – 10. 6. 2016",
                "stockWarningText": "Posledních pár kusů",
                "campaignEndAt": "2016-08-28T23:59:59+0000",
                "url": "https://www.bonami.cz/p/sada-dvou-neviditelny-polic-udb",
                "properties": [
                    {
                        "name": "Barva",
                        "value": "Bílá"
                    },
                    {
                        "name": "Rozměry",
                        "value": "25 x 15 x 45 cm (hloubka x výška x šířka)"
                    },
                    {
                        "name": "Materíál",
                        "value": "kvalitní ocel (silná 2 mm)"
                    },
                    {
                        "name": "Nosnost",
                        "value": "až 40 kg"
                    },
                    {
                        "name": "Poznámka",
                        "value": "vruty a hmožděňky na připevnění jsou součástí balení"
                    }
                ],
                "images": [
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    },
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    },
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    }
                ]
            },
                        {
                "niceUrl": "sada-dvou-neviditelny-polic-u-bile",
                "name": "Sada dvou neviditelných polic U, bílé",
                "description": "Nebudete možná věřit vlastním očím, ale Teebooks jsou neviditelné poličky, které udrží až 20 kg. Udrží všechny knihy, sešity i cédéčka a nedají to na sobě ani trochu znát. Jsou vyrobené z kvalitní 2 mm silné oceli a díky ukotvení pomocí vrutů a hmožděnek je žádná těžká váha nerozhodí. V sadě najdete hned dvě a to už je dost místa na vystavení všech vašich oblíbených (od této chvíle levitujících) knížek.",
                "brandName": "Teebooks",
                "price": 2999.00,
                "currency": "CZK",
                "retailPrice": 3459.00,
                "retailPriceCurrency": "CZK",
                "shippingPrice": 0.00,
                "shippingPriceCurrency": "CZK",
                "stockType": "available",
                "stockInfoText": "U vás doma 7. – 10. 6. 2016",
                "stockWarningText": "Posledních pár kusů",
                "campaignEndAt": "2016-08-28T23:59:59+0000",
                "url": "https://www.bonami.cz/p/sada-dvou-neviditelny-polic-u-bile",
                "properties": [
                    {
                        "name": "Barva",
                        "value": "Bílá"
                    },
                    {
                        "name": "Rozměry",
                        "value": "15 x 15 x 60 cm (hloubka x výška x šířka)"
                    },
                    {
                        "name": "Materíál",
                        "value": "kvalitní ocel (silná 2 mm)"
                    },
                    {
                        "name": "Nosnost",
                        "value": "až 20 kg"
                    },
                    {
                        "name": "Poznámka",
                        "value": "vruty a hmožděňky na připevnění jsou součástí balení"
                    }
                ],
                "images": [
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    },
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    },
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    }
                ]
            },
            {
                "niceUrl": "sada-dvou-neviditelnych-polic-udb",
                "name": "Sada dvou neviditelných polic UBD",
                "description": "Tváří se, že jsou neviditelné, ale ve skutečnosti unesou až 40 kg. Police Teebooks nejsou žádné sušinky, jejich pevné tělo je vyrobené z kvalitní oceli silné 2 mm a žádná těžká váha v podobě oblíbených knih pro ně není problém. Díky důmyslnému systému uchycení pomocí vrutů a hmožděnek doslova přirostou ke zdi a jakmile na ně vyskládáte oblíbené čtivo, už je nikdy nikdo nespatří a vaše knihy začnou levitovat.",
                "brandName": "Teebooks",
                "price": 3199.00,
                "currency": "CZK",
                "retailPrice": 3442.00,
                "retailPriceCurrency": "CZK",
                "shippingPrice": 0.00,
                "shippingPriceCurrency": "CZK",
                "stockType": "available",
                "stockInfoText": "U vás doma 7. – 10. 6. 2016",
                "stockWarningText": "Posledních pár kusů",
                "campaignEndAt": "2016-08-28T23:59:59+0000",
                "url": "https://www.bonami.cz/p/sada-dvou-neviditelny-polic-udb",
                "properties": [
                    {
                        "name": "Barva",
                        "value": "Bílá"
                    },
                    {
                        "name": "Rozměry",
                        "value": "25 x 15 x 45 cm (hloubka x výška x šířka)"
                    },
                    {
                        "name": "Materíál",
                        "value": "kvalitní ocel (silná 2 mm)"
                    },
                    {
                        "name": "Nosnost",
                        "value": "až 40 kg"
                    },
                    {
                        "name": "Poznámka",
                        "value": "vruty a hmožděňky na připevnění jsou součástí balení"
                    }
                ],
                "images": [
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    },
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    },
                    {
                        "productDetail-thumbnail": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-retina": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg",
                        "productDetail-thumbnail-full": "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-18926-claude-monet-reprodukce-obrazu.jpeg"
                    }
                ]
            }
        ],
        "links": {
            "prev": "/campaigns/teebooks-police/products",
            "next": "/campaigns/teebooks-police/products/?page=2&limit=20"
        }
    };
      resolve(this.data);
    });


    var baseUrl = 'http://www.bonami.cz/mcc16api/campaigns/';
    var URL = baseUrl + '/' + niceUrl + '/products/&limit=' + limit;

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

