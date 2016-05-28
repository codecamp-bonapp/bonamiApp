import {Injectable} from 'angular2/core';
import {AppConfig} from '../../config/config.js';

let PouchDB = require('pouchdb');
window["PouchDB"] = PouchDB;

/*
  Generated class for the LocalStorageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalStorageService {
  static get parameters(){
    return [[AppConfig]]
  }

  initDb (dbName){
    let db = Object.keys(this.appConfig.dbs).find((localDb) => { return this.appConfig.dbs[localDb] == dbName });
    if (db){
      return this.localDb = new PouchDB(dbName, { adapter: 'websql' });
    }else{
      console.error("This DB is not configured in the application: ", dbName);
    }
  }

  constructor(appConfig) {
    this.appConfig = appConfig.appConfig;
    this.localDb = {};
  }

  saveRecord(dbName, record){
    this.localDb = this.initDb(dbName);
    if (this.localDb){
      return this.localDb.put(record)
    }else{
      console.error("Unable to save record. Check the DB name.");
    }
  };

  getRecord(dbName, id){
    this.initDb(dbName);
    if (this.localDb){
      return this.localDb.get(id)
    }else{
      console.error("Unable to fetch record. Check the DB name.");
    }
  };

  deleteRecord(dbName, record){
    this.initDb(dbName);
    if (this.localDb){
      return this.localDb.remove(record)
    }else{
      console.error("Unable to delete record. Check the DB name.");
    }
  };

  getAllRecords(dbName){
    this.initDb(dbName);
    if (this.localDb){
      return this.localDb.allDocs({ include_docs: true});
    }else{
      console.error("Unable to fetch all records. Check the DB name");
    }
  };

  isArticleOffline(id){
    let offlineArticleIds = JSON.parse(localStorage.getItem('offlineArticles'));
    if(offlineArticleIds){
      return offlineArticleIds.indexOf(id) > -1;
    }
    return false;
  }

  deleteAllRecords(db){
    return db.destroy();
  };
}
