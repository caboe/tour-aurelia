import pages from '../src/data/page.js'
//TODO
// import pages from './src/data/page.json!json';

export class Navigation {
  constructor(){
    // console.log(window.pages.etap);
    this.sections = window.pages;
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
