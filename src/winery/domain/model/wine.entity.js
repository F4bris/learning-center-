export class Wine {
    constructor({id = null, name = '', winery = '', location = '', image = ''} = {}){
        this.id = id;
        this.name = name;
        this.winery = winery;
        this.location = location;
        this.image = image;
    }
}