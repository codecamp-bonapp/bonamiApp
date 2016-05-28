import {Page, NavController, NavParams, Storage, LocalStorage, Modal, Loading} from 'ionic-angular';
import {ArticleDetailPage} from '../article-detail/article-detail'
import {BonamiService} from '../../providers/bonami-service/bonami-service.js';
import {OnInit} from 'angular2/core';
import {MagazineService} from '../../providers/magazine-service/magazine-service.js'
import {LocalStorageService} from '../../providers/local-storage-service/local-storage-service.js'
import {AppConfig} from '../../config/config.js'
import {Focuser} from './focuser.js'

@Page({
  templateUrl: 'build/pages/magazine/magazine.html',
  directives: [Focuser]
})
export class MagazinePage {
  static get parameters() {
    return [[NavController], [NavParams], [BonamiService], [MagazineService],
    [LocalStorageService], [AppConfig]];
  }

  constructor(nav, navParams, bonamiService, magazineService, localStorageService, appConfig) {
    this.nav = nav;
    this.ls = localStorageService;
    this.ms = magazineService;
    this.appConfig = appConfig.appConfig;
    this.sampleImg = "https://1.bonami.cz/images/campaigns/homepage_screen/campaign-19316-spears-walker-hodinky.jpeg"
    this.navBarIconsActive = {star: false, tags: false};
    if (this.ms.data.length == 0){
      console.log("this.ms.data.length == 0");
      this.showLoadingScreen();
      this.initData();
      // CHECK INTERNET CONNECTION
      this.getApiArticles();
      // this.getOfflineArticles();
    }else{
      console.log("Data already available in this.ms:", this.ms);
      this.initData(this.ms.data);
    }
  }

  // Creates empty objects fro articles in order not to get errors
  // from html template as this.data.BELOW_OBJECTS is used in *ngFor cycle
  initData(data){
    if(data){
      this.data = { articles: data, tags: this.ms.getTags(data) };
      this.selectedTags = [];
    }else{
      this.data = {
        articles: [{
          id: '',
          image: '',
          title: 'Article',
          tags: ['inspirace', 'Novinka'],
          author: 'Lenka Nová',
          publishedAt: '',
          perex: 'Nějaký perex',
        }],
        tags: []
      };
      this.selectedTags = [];
    }
  }

  viewArticle(article){
    let articleModal = Modal.create(ArticleDetailPage, { id: article.id });
    // articleModal.onDismiss(date => { console.log("Modal dismissed"); })
    this.nav.present(articleModal);
  }

  showLoadingScreen(){
    var loading = Loading.create({spinner:"bonami-loader"});

    this.nav.present(loading);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  getApiArticles(){
    this.ms.getNewArticles([], false).then(data => {
      // console.log("getNewArticles", data);
      if(data){
        this.initData(data.reverse());
      }else{
        console.error("No data fetched from Magazine API.", data);
      }
    })
  }

  getOfflineArticles(){
    this.ms.getAllLocalArticles().then(data =>{
      if(data){
        this.data.articles = data;
        // this.navBarIconsActive.heart = !this.navBarIconsActive.heart;
      }else{
        console.error("No data fetched from Magazine API.", data);
      }
    })
  }

  toggleOfflineArticles(){
    this.navBarIconsActive.star ? this.initData(this.ms.data) : this.getOfflineArticles();
    this.navBarIconsActive.star = !this.navBarIconsActive.star;
  }

  offlineArticlesDisplayed(){
    return this.navBarIconsActive.star;
  }

  getTagsArticle(tagValue){
    this.selectedTags.push(tagValue);
    this.data.articles = this.data.articles.filter((article) => {
      return article.tags.some((tag) => { return tag == tagValue; })
    })
  }

  removeTag(tag){
    let tagIndex = this.selectedTags.indexOf(tag);
    this.selectedTags.splice(tagIndex, 1);
    this.data.articles = this.ms.data.filter(article => {
      if(this.selectedTags.length == 0){ return true }
      else {
        return this.selectedTags.some(selectedTag => {
          return article.tags.indexOf(selectedTag) != -1;
        })
      }
    })
  }

  searchArticles(searchbar){
    this.sample = ["auto", "motorka"];
    let searchedTerm = searchbar.value;
    if(searchedTerm.trim ==  ""){ return; }
    this.data.articles = this.data.articles.filter(article => {
      let foundInDescription = article.perex.toLowerCase().indexOf(searchedTerm.toLowerCase()) > -1;
      let foundInTitle = article.title.toLowerCase().indexOf(searchedTerm.toLowerCase()) > -1
      if(foundInTitle || foundInDescription){
        return true
      }else{
        return false
      }
    })
  }

  onPageDidEnter(){
    if(this.navBarIconsActive.star){
      this.getOfflineArticles();
    }
  }

  toggleElem(elemId){
    let tags = document.getElementById(elemId);
    tags.className == "slideup" ? tags.className = "slidedown" : tags.className = "slideup";
    if(elemId == 'tags') { this.navBarIconsActive.tags = !this.navBarIconsActive.tags; }
  }

  onCancelSearchBar(searchbar){
    this.initData(this.ms.data);
  }

  onClearSearchBar(searchbar){
    this.initData(this.ms.data);
  }

  deleteArticle(article){
    this.ms.deleteLocalArticle(article);
  }

}
