import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {CampaignsListPage} from './pages/campaigns-list/campaigns-list';
import {SettingsPage} from './pages/settings/settings';
import {Translate} from './pipes/translate';

import {NewsletterPage} from './pages/newsletter/newsletter';
import {MagazinePage} from './pages/magazine/magazine';
// import {SettingsPage} from './pages/settings/settings';
import {NewsletterService} from './providers/newsletter-service/newsletter-service.js'
import {MagazineService} from './providers/magazine-service/magazine-service.js'
import {BonamiService} from './providers/bonami-service/bonami-service.js';
import {LocalStorageService} from './providers/local-storage-service/local-storage-service.js'
import {AppConfig} from './config/config.js'

@App({
	templateUrl: 'build/app.html',
	pipes: [Translate],
	config: {
		backButtonText: ''
	}, // http://ionicframework.com/docs/v2/api/config/Config/
	providers: [NewsletterService, MagazineService, BonamiService, LocalStorageService, AppConfig]
})
class MyApp {
	static get parameters() {
		return [[IonicApp], [Platform], [BonamiService], [LocalStorageService], [AppConfig]];
	}

	constructor(app, platform, newsletterService, appConfig) {
    this.app = app;
    this.platform = platform;
    this.initializeApp();
    this.appConfig = appConfig.appConfig;
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Newsletter', component: NewsletterPage },
      { title: 'Magazine', component: MagazinePage }
    ];
    this.settingsPage = { title: 'Settings', component: SettingsPage };

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

	openNewsletterPage() {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		let nav = this.app.getComponent('nav');
		nav.setRoot(NewsletterPage);
	}

	openMagazinePage() {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		let nav = this.app.getComponent('nav');
		nav.setRoot(MagazinePage);
	}

	openSettingsPage() {
		let nav = this.app.getComponent('nav');
		nav.setRoot(SettingsPage);
	}
}
