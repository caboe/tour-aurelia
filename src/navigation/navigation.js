import {bindable} from 'aurelia-framework';

export class Navigation {
  @bindable sections;

  constructor(){}
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
