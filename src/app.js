import {pages} from 'data/pages';
//TODO
// import pages from './src/data/page.json!json';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class App {
    constructor(eventAggregator) {
        this.sections = pages;
        this.navigatePath = ['etap', 0];
        this.currentPage = this.getCurrentPage();
        this.navigateToPage(this.navigatePath);
        this.eventAggregator = eventAggregator;
        let subscription = this.eventAggregator.subscribe('navigate', this.navigateToPage.bind(this));
    }

    navigateToPage(path) {
        this.navigatePath = path;
        this.currentPage = this.sections[this.navigatePath[0]][this.navigatePath[1]];
    }

    getNavigatePath() {
        return this.navigatePath;
    }

    getCurrentPage() {
        return this.sections[this.navigatePath[0]][this.navigatePath[1]];
    }
}
