import {bindable, inject, computedFrom} from 'aurelia-framework';
import {NavigationService} from 'navigation-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(NavigationService, EventAggregator)
export class Default {
    @bindable section;
    @bindable sectionId;
    constructor(navigationService, EventAggregator) {
        this.navigationService = navigationService;
        this.eventAggregator = EventAggregator;
        this.navigationActive = false;
        this.eventAggregator.subscribe('showFade', function(response) {
            if (!response.active){
                this.navigationActive = response.active;
            }
        }.bind(this));
    }

    get currentItem(){
        return this.navigationService.page;
    }

    navigateTo(navigatePath) {
        this.navigationService.navigateToPage(navigatePath);
        this.eventAggregator.publish('showFade', {active: false});
    }
}
