import {Injectable} from 'angular2/core';
import {BonamiService} from '../../providers/bonami-service/bonami-service.js';
import {LocalStorageService} from '../local-storage-service/local-storage-service.js'
import {AppConfig} from '../../config/config.js'

@Injectable()
export class NewsletterService {
  static get parameters(){
    return [[BonamiService], [LocalStorageService], [AppConfig]]
  }

  constructor(bonamiService, localStorageService, appConfig) {
    this.bonami = bonamiService;
    this.ls = localStorageService;
    this.appConfig = appConfig.appConfig;
    this.data = []//this.getNewsletters();
  }

  // Gets data from Local Storage (PouchDB) and saves it to this.Data
  // if timelimit for checking new newsletter at Bonami is reached
  // it will check for new newsletters, fetches and saves them to
  // Local Storage and adds them to this.data (this.getNewNewsletters)
  getNewsletters(checkNew){
    if (this.data.length == 0){
      return new Promise(resolve => {
        this.getAllLocalNewsletters().then((data) => {
          this.data = this.data.sort(this.compareDates);
          let localNewslettersIds = this.data.map((nl) => { return nl.id });

          if(checkNew || this.checkNewNewsletters()){
            this.getNewNewsletters(localNewslettersIds, true).then((resp) => {
              console.log("observable", resp);
              resolve(resp);
            });
          }else{
            resolve(this.data[0]);
          }
        }).catch((err) => { console.log(err); });
      })
    }
  }

  compareDates(newsletter1, newsletter2){
    let date1 = new Date(newsletter1.publishedAt);
  	let date2 = new Date(newsletter2.publishedAt);

    if(date1 < date2){ return 1 };
  	if(date1 > date2){ return -1 };
  	return 0;
  }
  // Gets all newsletters from Local Storage and adds them to this.data
  getAllLocalNewsletters(){
    return new Promise(resolve => {
      this.ls.getAllRecords(this.appConfig.dbs['newsletterDbName']).then((data) =>{
        this.data = data.rows.map((row) => {
          let nlDate = new Date(row.doc.publishedAt)
          row.doc.date = nlDate.toLocaleDateString();
          return row = row.doc
        })
        this.data = this.removeExpiredNewsletters(this.data);
        this.data.sort(this.compareDates);
        resolve(this.data);
      }).catch((err) => {
        console.error("Error fetching newsletters from local DB: ", err);
      })
    })
  }

  // Checking if timelimit fro appConfig for checking new
  // newsletters is reached
  checkNewNewsletters(){
    let lastBonamiUpdate = new Date(localStorage.getItem("lastNlUpdateCheck"));
    console.log("Last Bonami new newsletters check at: ", lastBonamiUpdate);
    console.log("(new Date() - lastBonamiUpdate) >= this.appConfig.remoteNlIntervalCheck",
      (new Date() - lastBonamiUpdate) >= this.appConfig.remoteNlIntervalCheck);
    return (new Date() - lastBonamiUpdate) >= this.appConfig.remoteNlIntervalCheck;
  }

  // Fetched new newsletters from Bonami API and saves them
  // to Local Storage if passed parameter save == true
  // and also adds to this.data (this.saveNewsletter)
  getNewNewsletters(newsletterIds, save){
    return new Promise(resolve => {
      this.bonami.getNewslettersList().map((resp)=> resp.json()).subscribe((resp) => {
        console.log("Newsletter list fetched.", resp);
        // resp.push({"id":2,"domain":"cz","perexTitle":"","publishedAt":"2016-05-25T05:00:00+02:00"});
        resp.sort(this.compareDates);
        resp.forEach(remoteNewsl => {
          let isNew = remoteNewsl.id != newsletterIds.find((localNewsletterId) => {
            return localNewsletterId == remoteNewsl.id;
          })
          if(isNew && !this.isNlExpired(remoteNewsl)){
            this.getNewsletter(remoteNewsl.id).then(resp => {
              if (save){ this.saveNewsletter(resp) };
              // this.data.push(resp);
              resolve(resp);
            })
          }
        });
        localStorage.setItem("lastNlUpdateCheck", Date());
      }, (err) => {
        console.error("Unable to fetch Bonami newsletter list: ", err);
      })
    })
  }

  getLocalNlIds(){
    return this.data.map(newsletter => { return newsletter.id });
  }

  // Fetched newsletter from Bonami API
  getNewsletter(id){
    return new Promise(resolve => {
      this.bonami.getNewsletter(id).map((res)=> res.json()).subscribe(
        resp => {
          console.log("New newsletter fetched: ", resp);
          // resp.id += Math.ceil(Math.random()*30); // Unique ID is neede to save to PouchDB workaround befor API is available.
          resolve(resp);
        },
        err => {console.error("Bonami Service error: ", err);}
      );
    })
  }

  //gets one Newsletter from local DB/Storage
  getLocalNewsletter(id){
    let newsletter =
    this.ls.getRecord(this.appConfig.dbs['newsletterDbName'], id).then((data) => {
      console.log("Record fetched (data): ", data);
      return data;
    }).catch((err) => {
      console.error("Unable to fetch record from local DB: ", err);
      return {};
    });
    return newsletter;
  }

  // Saves newsletter to Local Storage and also adds it to this.data
  saveNewsletter(newsletter){
    if (newsletter.id){
      newsletter._id = String(newsletter.id);
      return this.ls.saveRecord(this.appConfig.dbs['newsletterDbName'], newsletter).then((resp) => {
        console.log("Newsletter saved.", resp);
        newsletter._rev = resp.rev;
        this.data.unshift(newsletter);
      }).catch((err) => {
        console.error("Unable to save newsletter: ", newsletter.id, err);
      });
    }
  }

  // Deletes newsletter from Local Storage and removes it from this.data
  deleteLocalNewsletter(newsletter){
    this.ls.deleteRecord(this.appConfig.dbs['newsletterDbName'], newsletter).then((resp) => {
      console.log("Newsletter deleted. ", resp);
      // let index = this.data.indexOf(newsletter);
      // if (index > -1){ this.data.splice(index, 1); }
    }).catch((err) => {
      console.error("Unable to delete newsletter: ", err);
    })
  }


  isNlExpired(newsletter){
    let today = new Date();
    let nwslPublished = new Date(newsletter.publishedAt);
    return today.valueOf() - nwslPublished.valueOf() >= this.appConfig.nwslRententionPeriod;
  }

  removeExpiredNewsletters(newsletters){

    if(newsletters && newsletters instanceof Array){
      let expiredNewsletters = [];
      let validNewsletters = newsletters.filter((newsletter) => {
        // let isNlExpired = today.valueOf() - nwslPublished.valueOf() >= this.appConfig.nwslRententionPeriod;
        if(this.isNlExpired(newsletter)){ expiredNewsletters.push(newsletter); }
        return !this.isNlExpired(newsletter);
      })
      console.log("Removing expired: ", expiredNewsletters.map(nl=>{ return nl = nl.id; }));
      console.log("valid: ", validNewsletters.map(nl=>{ return nl=nl.id; }));
      expiredNewsletters.forEach(newsletter => { this.deleteLocalNewsletter(newsletter); })
      return validNewsletters;
    }
  }

  // for testing purposes only. Used to generate button headings in html template
  calculateDateFromToday(numOfDays, dayMonthFormat = false){
    let today = new Date;
    let dayInMiliSecs = 1000 * 3600 * 24;
    if (Number(numOfDays) || numOfDays == 0){
      let date = new Date(today.valueOf() + (dayInMiliSecs * Number(numOfDays)));
      if (dayMonthFormat) {
        return (date.getDate()) + "." + (date.getMonth()) + "."
      }
      return date;
    }
    return 0;
  }

  // Not yet implemented
  updateNewsletters(){
    this.deleteOldNewsletters();
  }

}
