export class StorageItem {

    constructor({
                    id = null, cellarId = null, wineType = '', wineId = null,
                    wineName = '', quantity = 0, registeredAt = null
                } = {}) {
        this.id = id;
        this.cellarId = cellarId;
        this.wineType = wineType;
        this.wineId = wineId;
        this.wineName = wineName;
        this.quantity = quantity;
        this.registeredAt = registeredAt;
    }
}