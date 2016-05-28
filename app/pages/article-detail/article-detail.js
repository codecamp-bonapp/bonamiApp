import {Page, NavController, ViewController, NavParams, ActionSheet, Toast, Loading} from 'ionic-angular';
import {MagazineService} from '../../providers/magazine-service/magazine-service.js'
/*
  Generated class for the ArticleDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/article-detail/article-detail.html',
})
export class ArticleDetailPage {
  static get parameters() {
    return [[NavController], [ViewController], [NavParams], [MagazineService]];
  }

  constructor(nav, viewCtrl, params, magazineService) {
    this.nav = nav;
    this.viewCtrl = viewCtrl;
    this.article = {image: '../../img/samplemgz.png'};
    this.labels = {
      addToFav: 'Přidat do oblíbených',
      delFromFav: 'Odebrat z oblíbených',
      msgFavAdded: 'Článek přidán do oblíbených.',
      msgFavDeleted: 'Článek odebrán z oblíbeých',
      chooseArticleAction: 'Vyberte akci pro článek',
      cancel: 'Zrušit',
      share: 'Sdílet',
      errFav: 'Chyba: Článek nelze přidat do oblíbených.',
      errFavDel: 'Chyba: Článek nelze odebrat z oblíbených.'
    },
    this.ms = magazineService;
    this.showLoadingScreen();
    this.ms.getMagazineArticle(params.data.id).then(data => {
      this.article = data;
      this.article.content = this.fixImgStyle(this.article.content);
      // console.log('this.article', this.article);
    });
  }

  showLoadingScreen(){
    var loading = Loading.create();

    this.nav.present(loading);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  saveForOffline(){
    if(!this.isArticleOffline()){
      this.ms.saveArticle(this.article).then(resp => {
        console.log("saveForOffline: ", resp);
        // localStorage.setItem("offlineArticles", )
      }).catch(err => {
        console.error("saveForOffline err:", err);
      })
    }

  }

  showInfoMessage(message){
    let toast = Toast.create({
      message: message,
      duration: 3000
    });

    this.nav.present(toast);
  }

  isArticleOffline(){
    let offlineArticleIds = JSON.parse(localStorage.getItem('offlineArticles'));
    if(offlineArticleIds){
      return offlineArticleIds.indexOf(this.article.id) > -1;
    }
    return false;
  }

  addArticleIdToLs(){
    if(!this.isArticleOffline()){
      let offlineArticlesIds = JSON.parse(localStorage.getItem('offlineArticles')) || [];
      offlineArticlesIds.push(this.article.id);
      localStorage.setItem('offlineArticles', JSON.stringify(offlineArticlesIds));
    }
  }

  updateArticleIdInLs(action){
    let offlineArticlesIds = JSON.parse(localStorage.getItem('offlineArticles')) || [];
    if(action == 'add' && !this.isArticleOffline()){
      offlineArticlesIds.push(this.article.id);
    }else if (action == 'remove' && this.isArticleOffline()){
      let index = offlineArticlesIds.indexOf(this.article.id);
      offlineArticlesIds.splice(index, 1);
    }
    localStorage.setItem('offlineArticles', JSON.stringify(offlineArticlesIds));
  }

  articleActionSheet() {
    let favButtons = {
      addToFav: {
        text: this.labels.addToFav,
        handler: () => {
          this.ms.saveArticle(this.article).then(resp =>{
            this.updateArticleIdInLs('add');
            this.showInfoMessage(this.labels.msgFavAdded);
          }).catch(err => {
            this.showInfoMessage(this.labels.errFav);
            console.error("Unable to save article:", err);
          });
        }
      },
      delFromFav: {
        text: this.labels.delFromFav,
        role: 'destructive',
        handler: () => {
          this.ms.deleteLocalArticle(this.article);
          this.updateArticleIdInLs('remove');
          this.showInfoMessage(this.labels.msgFavDeleted);
        }
      }
    };

    let actionSheet = ActionSheet.create({
      title: 'Vyberte akci pro článek',
      buttons: [
        {
          text: this.labels.share,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: this.labels.cancel,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    if(this.isArticleOffline()){ actionSheet.data.buttons.unshift(favButtons.delFromFav)
    }else{ actionSheet.data.buttons.unshift(favButtons.addToFav) }

    this.nav.present(actionSheet);
  }

  // This will change the img size (only jpg) and remove
  // youtoube video from article content fetched by API
  fixImgStyle(innerHtml){
    let imgSrcRegexp = /(<img.*?src="[^"]*)\.jpg(" .* srcset)/g;
    let ytubeRegexp = /<iframe.*<\/iframe>/g;
    let updatedHtml = innerHtml.replace(/width:([^;")]*)/g, "width: auto");
    updatedHtml = updatedHtml.replace(/width=("|')[^"]*"/g, 'width="auto"');
    updatedHtml = updatedHtml.replace(/height=("|')[^"]*"/g, 'height="auto"');
    updatedHtml = updatedHtml.replace(imgSrcRegexp,"$1-300x200.jpg$2");
    updatedHtml = updatedHtml.replace(ytubeRegexp, "");
    return updatedHtml;
  }

  dismiss(){
    // this.article = article;
    this.viewCtrl.dismiss();
  }

}
