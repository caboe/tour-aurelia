import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ImageService} from 'image-service';

@inject(ImageService, EventAggregator)
export class Slideshow {
    constructor(imageService, eventAggregrator) {
        this.eventAggregrator = eventAggregrator;
        this.imageService = imageService;
        this.collection = this.imageService.currentStage;
        this.imageService.setCurrentCollection(0);
        this.loading = true;
        this.current = 0;
        this.slidePosition = 0;
        this.tick;
        this.eventAggregrator.subscribe('stage', () => this.initSlideshow());
    }

    initSlideshow(){
        this.collection = this.imageService.currentStage;
        this.tick = window.setInterval(() => {this.nextImage()}, 3000);
        this.loading = false;
    }

    nextImage(){
        this.current += 1;
        if (this.current >= this.collection.length)
            this.current = 0;
    }
}
