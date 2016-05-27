import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {CampaignsListPage} from './pages/campaigns-list/campaigns-list';
import {SettingsPage} from './pages/settings/settings';

@App({
	templateUrl: 'build/app.html',
	config: {
		backButtonText: ''
	} // http://ionicframework.com/docs/v2/api/config/Config/
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

		if(!language) {
			if (~navigator.language.indexOf('pl')) language = 'pl';
			else if (~navigator.language.indexOf('sk')) language = 'sk';
			else language = 'cs';
			localStorage.setItem('language', language);
		}

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

	openSettingsPage() {
		let nav = this.app.getComponent('nav');
		nav.setRoot(SettingsPage);
	}
}
