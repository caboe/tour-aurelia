import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-http-client';

@inject(EventAggregator)
export class ImageService {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.ready = false;
        this.loadCollections();
        this.currentStage = [];
        this.currentNr = 0;
        this.collection = {};
    }

    loadCollections() {
        let client = new HttpClient();

        client.jsonp('https://api.flickr.com/services/rest/?method=flickr.collections.getTree&user_id=24537538@N04&api_key=531e7a0d62fe823d91b9ebcfca750195&collection_id=72157624746422138&format=json')
            .then(data => {
                this.collection = data.response;
                this.refreshCurrentCollection();
                this.ready = true;//??
            });
    }

    loadCurrentStage(){
        this.loadStage(this.currentNr);
    }
    loadStage(nr){
        const setId = this.getIdForStage(nr);
        let client = new HttpClient();

        client.jsonp(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=${setId}&api_key=531e7a0d62fe823d91b9ebcfca750195&format=json&json`)
            .then(data => {
                this.currentStage = data.response.photoset.photo;
                this.eventAggregator.publish('stage', {imageLoad: 'finished'});
            });
        // var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=" + setId + "&api_key=531e7a0d62fe823d91b9ebcfca750195&format=json&jsoncallback=tour.images.fillStageIndex"

    }
    getIdForStage(nr){
        return this.collection.collections.collection[0].set[nr].id;
    }
    refreshCurrentCollection() {
        this.setCurrentCollection(this.currentNr);
        console.log(this.currentStage);
    }

    setCurrentCollection(nr) {
        this.currentNr = nr;
        if (!this.collection.hasOwnProperty('collections'))
            this.collection = [];
        else
            this.loadCurrentStage();
    };


}