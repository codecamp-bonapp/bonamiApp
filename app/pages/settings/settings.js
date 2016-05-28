import {Page, NavController} from 'ionic-angular';
import {CampaignsListPage} from '../campaigns-list/campaigns-list';
import {Translate} from '../../pipes/translate';
import {AppConfig} from '../../config/config.js'

@Page({
	templateUrl: 'build/pages/settings/settings.html',
	pipes: [Translate]
})
export class SettingsPage {
	static get parameters() {
		return [[NavController], [AppConfig]];
	}

	constructor(nav, appConfig) {
		this.nav = nav;
		this.language = localStorage.getItem('language') || 'cs';
		this.rootPage = CampaignsListPage;
		this.appConfig = appConfig.appConfig;
	}

	setLanguage(language) {
		localStorage.setItem('language', language);
	}

	redirect() {
		location.reload();
	}
}
