export class Cellar{
    constructor({id = null, name = '', wineType = '', capacity =0 } = {}) {
        this.id = id;
        this.name = name;
        this.wineType = wineType;
        this.capacity = capacity;
    }
}