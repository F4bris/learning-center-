export class CreateStorageItemRequest {
    constructor({ cellarId, wineType, wineId, wineName, quantity, registeredAt}){
        this.cellarId = cellarId;
        this.wineType = wineType;
        this.wineId = wineId;
        this.wineName = wineName;
        this.quantity = quantity;
        this.registeredAt = registeredAt;
    }
}