import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {CampaignsListPage} from './pages/campaigns-list/campaigns-list';


@App({
	templateUrl: 'build/app.html',
	config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
	static get parameters() {
		return [[IonicApp], [Platform]];
	}

	constructor(app, platform) {
		this.app = app;
		this.platform = platform;

		this.initializeApp();

		this.rootPage = CampaignsListPage;
	}

	initializeApp() {
		var language = localStorage.getItem('language');
		if(!language) localStorage.setItem('language', 'cs');

		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
		});
	}

	openMainPage() {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		let nav = this.app.getComponent('nav');
		nav.setRoot(this.rootPage);
	}
}
