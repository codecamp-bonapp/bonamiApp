import {Page, NavController} from 'ionic-angular';
import {CampaignsListPage} from '../campaigns-list/campaigns-list';

@Page({
	templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
	static get parameters() {
		return [[NavController]];
	}

	constructor(nav) {
		this.nav = nav;
		this.language = localStorage.getItem('language') || 'cs';
		this.rootPage = CampaignsListPage;
	}

	setLanguage(language) {
		localStorage.setItem('language', language);
	}

	redirect() {
		this.nav.setRoot(this.rootPage);
	}
}
