import {bindable, inject} from 'aurelia-framework';
import {NavigationService} from 'navigation-service';

@inject(NavigationService)
export class Page {
    constructor(navigationService) {
        this.navigationService = navigationService;
        this.currentPage = this.navigationService.currentPage;
    }

    getCurrentPage(){
        return this.navigationService.currentPage;
    }
}
