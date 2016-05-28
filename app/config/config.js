import {Injectable} from 'angular2/core';

@Injectable()
export class AppConfig{

  constructor(){
    this.appConfig = {
      // basic config
      debugMode: true,
      storagePrefix: "test_",

      // date config
      weekDays: ['nedele', 'pondeli','utery','streda', 'ctvrtek', 'patek', 'sobota'],
      // API config
      apiUrlTest: "private-anon-e17b6324b-bonami1.apiary-mock.com",
      apiUrl: "www.bonami.cz/mcc16",
      apiEndpoints: {
        newsletters: "/newsletters",
        newsletterById: "/newsletters/:id",
        magazines: "/magazine-articles",
        magazineArticleById: "/magazine-articles/:id"
      },
      // DB Congif
      dbs: {
          newsletterDbName: "bonami-newsletters",
          magazineDbName: "bonami-magazines"
        },
      // interval after which we check new newsletters
      // using Bonami API
      remoteNlIntervalCheck: 3600000,
      //expiration date for newsetters in ms. One day = (1000 * 3600 * 24)ms
      nwslRententionPeriod: 6 * (1000 * 3600 * 24),
      oneSignalAppId: "8baf272d-5a7f-4f97-8b72-75df81f0d15b",
      googleProjectId: "1005880216694",
      userConfig: localStorage.getItem("userConfig"),
      lang: "cz"
    }
  }

  getApiUrl(endpoint){
    let url = "https://" + this.appConfig.apiUrl + this.appConfig.apiEndpoints[endpoint];
    return url;
  }
}
