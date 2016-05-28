import {Page, NavController, NavParams, Storage, LocalStorage, Modal, Loading} from 'ionic-angular';
import {BonamiService} from '../../providers/bonami-service/bonami-service.js';
import {OnInit, ViewChild} from 'angular2/core';
import {NewsletterService} from '../../providers/newsletter-service/newsletter-service.js';
import {LocalStorageService} from '../../providers/local-storage-service/local-storage-service.js';
import {AppConfig} from '../../config/config.js';
import {ArticleDetailPage} from '../article-detail/article-detail';



@Page({
  templateUrl: 'build/pages/newsletter/newsletter.html',
  queries: {
    slider: new ViewChild('onStockSlider'),
    menu: new ViewChild('menuSlider')
  }
})
export class NewsletterPage {
  static get parameters() {
    return [[NavController], [NavParams], [BonamiService], [NewsletterService],
    [LocalStorageService], [AppConfig]];
  }
  // Created this.data and fills it with newsletters from Local Storage
  // and if time limit for checking new newsletters is reached, it will also
  // check and fetch newsletters from Bonami API
  // this.data is referenced to NewsletterService which is a singleton hence
  // the data doesn't need to be fetched from LocalStorage every time we
  // navigate to NewsletterPage
  constructor(nav, navParams, bonamiService, newsletterService, localStorageService, appConfig) {
    this.nav = nav;
    this.ls = localStorageService;
    this.nls = newsletterService;
    this.appConfig = appConfig.appConfig;
    this.today = (new Date()).getDay();
    this.sampleImg = "https://1.bonami.cz/images/campaigns/newsletter_new/campaign-297-darkove-poukazy.jpeg?v=iaa4h"
    this.onStockSliderOptions = {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true
    }
    this.menuOptions = {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true
    }
    if (this.nls.data.length == 0){ // newsletters haven't been fetched from NewsletterService yet
      // console.log("this.nls.data.length == 0");
      this.showLoadingScreen();
      this.initData();
      this.getNewsletters();
    }else if(this.nls.checkNewNewsletters()){
      this.showLoadingScreen();
      this.initData(this.nls.data[0]);
      // console.log("Checking new newsletters at Bonami.");
      this.getApiNewsletters();
    }else{
      this.initData(this.nls.data[0]);
      // console.log("Data already available in this.nls:", this.nls);
    }
  }

  showLoadingScreen(){
    var loading = Loading.create();

    this.nav.present(loading);

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  hideLoadingScreen(){
    this.loadingScreen.dismiss();
  }
  // Creates empty objects fro newsletters in order not to get errors
  // from html template as this.data.BELOW_OBJECTS is used in *ngFor cycle
  initData(data){
    if(data){
      this.data = data;
      this.activeNl = data.id;
    }else{
      this.data = {
        onStockProducts: {},
        magazineArticle: {},
        lovedProducts: {},
        endingCampaigns: [{images: {}}],
        newCampaigns: [{campaign: {images: {}}, products: [{}]}]
      };
    }
  }

  doRefresh(event){
    console.log("Pull to refresh activated");
    event.complete();
    // this.getApiNewsletters()
  }

  getSlider(){
    console.log("this.slider.getSlider()", this.slider.getSlider());
  }

  getNewsletters(){
    this.nls.getAllLocalNewsletters().then(data => {
      console.log("getAllLocalNewsletters()", data);
      if(data[0]){
        this.initData(data[0]);
      }
      // this.data.end = [{name: "test"}];
      this.getApiNewsletters();
    });
  }

  getApiNewsletters(){
    // if(this.nls.checkNewNewsletters()){
      this.nls.getNewNewsletters(this.nls.getLocalNlIds(), true).then(data => {
        console.log("getNewNewsletters", data);
        if(data){ this.data = data; }
      })
    // }
  }

  log(object){
    console.log("log: ", object);
  }

  removeTimeStamp(itemName){
    localStorage.removeItem(itemName);
  }
  dataAvailable(name){
    if(this.data.hasOwnProperty(name)){
      return !(Object.keys(this.data.name).length === 0 && this.data.name.constructor === Object)
    }
  }
  // for testing purposes only
  onPagedidEnter(){
    this.toggleTitle(this.data.id);
  }

  displayNewsletter(event, nlId){
    this.moveUnderline(event);
    this.data = this.nls.data.find(newsletter => { return newsletter.id == nlId })
    // this.toggleTitle(nlId);
  }

  moveUnderline(event){
    let underline = document.getElementById("underline");
    let left = event.srcElement.offsetParent.offsetLeft;
    let width = event.srcElement.offsetWidth;
    underline.style.left = left + 'px';
    underline.style.width = width + 'px';
  }

  toggleTitle(id){
    let calcNewTop = function (elem, num){
      if(!elem.style.top){ elem.style.top = "0px" };
      let newTop = Number(elem.style.top.replace("px","")) + Number(num);
      return newTop;
    }
    if(this.activeNl == id){ return };

    let dateElem = document.getElementById("date_"+id);
    // let titleElem = document.getElementById("title_"+id);
    let titleToHide;

    if(titleElem.style.display == "none"){
      if(this.activeNl){
        titleToHide = this.activeNl;
        this.activeNl = id;
      }else{
        this.activeNl = id
      }
      dateElem.style.top = calcNewTop(dateElem, -15) + "px";
      titleElem.style.top = (dateElem.offsetTop + 26) + "px"//calcNewTop(titleElem, -15) + "px";
      titleElem.style.display = "block";
      titleElem.style.left = dateElem.offsetLeft + 'px';
      if(titleToHide){ this.toggleTitle(titleToHide) };
    }else{
      dateElem.style.top = calcNewTop(dateElem, 15) + "px";
      dateElem.style["font-size"] = 'inherit';
      titleElem.style.left = '-150px';
      titleElem.style.display = "none";
      // titleElem.style.top = calcNewTop(titleElem, 15) + "px";
    }
  }


  delNewsletter(nlId){
    this.nls.deleteLocalNewsletter(this.nls.data.find((nl)=>{return nl.id == nlId}));
  }

  // for testing purposes only
  viewArticle(articleId){
    let articleModal = Modal.create(ArticleDetailPage, { id: articleId });
    // articleModal.onDismiss(date => { console.log("Modal dismissed"); })
    this.nav.present(articleModal);
  }


  campaignEnded(endTime){
    let timeLeft = this.calculateTimeRemaining(endTime);
    if(timeLeft.days > 0 || timeLeft.hoursLeft > 0){ return false; }
    return true;
  }

  // Used in html template to calculate product/campaing remaining time
  calculateTimeRemaining(timeUTC){ // input time format: 2016-08-28T23:59:59+0000
    let dateNow = new Date;
    let dateEnd = Date.parse(timeUTC);
    let timeDiff = dateEnd - dateNow.valueOf();
    let dayInMSec = 24 * 3600 * 1000;
    let hourInMSec = 3600 * 1000;
    let daysLeft = Math.floor(timeDiff / dayInMSec);
    let hoursLeft = Math.floor(((timeDiff + dateNow.getTimezoneOffset()*60000) % dayInMSec)/ hourInMSec)
    return {
      "days": daysLeft,
      "hours": hoursLeft
    }
  }

  dayNameDate(d){
  	let date = new Date(d);
  	return this.appConfig.weekDays[date.getDay()] + " " + date.getDate() + "." + (date.getMonth()+1) + "."
  }

}
