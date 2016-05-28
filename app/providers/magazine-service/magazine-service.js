import {Injectable} from 'angular2/core';
import {BonamiService} from '../../providers/bonami-service/bonami-service.js';
import {LocalStorageService} from '../local-storage-service/local-storage-service.js'
import {AppConfig} from '../../config/config.js'

@Injectable()
export class MagazineService {
  static get parameters(){
    return [[BonamiService], [LocalStorageService], [AppConfig]]
  }

  constructor(bonamiService, localStorageService, appConfig) {
    this.bonami = bonamiService;
    this.ls = localStorageService;
    this.appConfig = appConfig.appConfig;
    this.data = [];
    this.magazineArticles = {};
  }

  getAllLocalArticles(){
    return new Promise(resolve => {
      this.ls.getAllRecords(this.appConfig.dbs['magazineDbName']).then((data) =>{
        // this.data = data.rows.map((row) => {
        let offlineArticles = data.rows.map((row) => {
          let artDate = new Date(row.doc.publishedAt)
          row.doc.date = artDate.toLocaleDateString();
          return row = row.doc
        })
        resolve(offlineArticles);
      }).catch((err) => {
        console.error("Error fetching magazine articles from local DB: ", err);
      })
    })
  }

  // addToFavourite(article){
  //   let favArticle = article;
  //   favArticle.fav = true;
  //   this.saveArticle(favArticle);
  // }

  getTags(){
    // console.log("this.data: ", this.data);
    let tags = []
    this.data.forEach(article => { if(article.tags.length > 0) tags.push(article.tags); })
    tags = tags.reduce((tags1, tags2) => { return tags1.concat(tags2); })
    return this.tags = tags.filter((tag, pos) => { return tags.indexOf(tag) == pos; } )
  }

  // Checking if timelimit for appConfig for checking new
  // magazineArticles is reached
  checkNewArticles(){
    let lastBonamiUpdate = new Date(localStorage.getItem("lastMgzUpdateCheck"));
    console.log("Last Bonami new magazine articles check at: ", lastBonamiUpdate);
    return (new Date() - lastBonamiUpdate) >= this.appConfig.remoteNlIntervalCheck;
  }

  // Fetched new magazineArticles from Bonami API and saves them
  // to Local Storage if passed parameter save == true
  // and also adds to this.data (this.saveArticle)
  getNewArticles(magazineArticleIds, save){
    return new Promise(resolve => {
      this.bonami.getMagazineArticleList().map((resp)=> resp.json()).subscribe((resp) => {
        // console.log("Articles list fetched.", resp);
        this.data = resp;
        localStorage.setItem("lastMgzUpdateCheck", Date());
        resolve(this.data);
      }, (err) => {
        console.error("Unable to fetch Bonami article list: ", err);
      })
    })
  }

  // Fetched magazineArticle from Bonami API
  getMagazineArticle(id){
    return new Promise(resolve => {
      this.bonami.getMagazineArticle(id).map((res)=> res.json()).subscribe(
        resp => {
          // console.log("New magazineArticle fetched: ", resp);
          resolve(resp);
        },
        err => {console.error("Bonami Service error: ", err);}
      );
    })
  }

  // Saves magazineArticle to Local Storage and also adds it to this.data
  saveArticle(article){
    if (article.id){
      article._id = String(article.id);
      return this.ls.saveRecord(this.appConfig.dbs['magazineDbName'], article);
    }
  }

  // Deletes magazineArticle from Local Storage and removes it from this.data
  deleteLocalArticle(article){
    this.getAllLocalArticles().then(data => {
      let articleToRemove = data.find(localArticle => { return localArticle._id == String(article.id) });
      this.ls.deleteRecord(this.appConfig.dbs['magazineDbName'], articleToRemove).then((resp) => {
        console.log("magazineArticle deleted. ", resp);
        // let index = this.data.indexOf(magazineArticle);
        // if (index > -1){ this.data.splice(index, 1); }
        return true;
      }).catch((err) => {
        console.error("Unable to delete magazineArticle: ", err);
        return false;
      })
    })
  }
}
