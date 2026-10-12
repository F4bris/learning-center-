export class StorageItemResource {
    constructor({id, cellarId, wineType, wineId, wineName, quantity, registeredAt}){
        this.id = id;
        this.cellarId = cellarId;
        this.wineType = wineType;
        this.wineId = wineId;
        this.wineName = wineName;
        this.quantity = quantity;
        this.registeredAt = registeredAt;
    }
}