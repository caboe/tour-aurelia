import pages from './src/page.js'
//TODO
// import pages from './src/page.json!json';

export class Navigation {
  constructor(){
    // console.log(window.pages.etap);
    this.sections = pages;
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
