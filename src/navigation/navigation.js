import {bindable} from 'aurelia-framework';

import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Navigation {
    @bindable sections;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    navigateTo(navigatePath) {
        this.eventAggregator.publish('navigate', navigatePath);
    }
}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
