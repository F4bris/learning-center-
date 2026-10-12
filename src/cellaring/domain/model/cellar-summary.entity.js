import {Cellar} from "@/cellaring/domain/model/cellar.entity.js";

export class CellarSummary {
    constructor({cellar, storageItems =[]}) {
        this.cellar = cellar instanceof Cellar ? cellar : new Cellar();
        this.storageItems = storageItems;
    }

    get totalBottles(){
        return this.storageItems.reduce((total, storageItem) => total + storageItem, 0);


    }

    get availableCapacity(){
        return this.cellar.capacity - this.totalBottles;
    }

    get isEmpty(){
        return this.storageItems.length === 0;
    }
}