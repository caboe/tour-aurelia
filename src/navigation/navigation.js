import {bindable, inject} from 'aurelia-framework';
import {NavigationService} from 'navigation-service';

@inject(NavigationService)
export class Navigation {
    constructor(navigationService) {
        this.navigationService = navigationService;
        this.sections = this.navigationService.sections;
    }

    get currentSection(){
        return this.navigationService.section;
    }
    get currentItem(){
        return this.navigationService.page;
    }

    navigateTo(navigatePath) {
        this.navigationService.navigateToPage(navigatePath);
    }

}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}
