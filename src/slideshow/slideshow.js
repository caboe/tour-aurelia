import {inject} from 'aurelia-framework';
import {ImageService} from 'image-service';

@inject (ImageService)
export class Slideshow {
    constructor(imageService){
        this.imageService = imageService;
        this.collection = this.imageService.currentStage;
        this.imageService.setCurrentCollection(0);
    }
}