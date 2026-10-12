import {WineResource} from "@/winery/infrastructure/wine-resource.js";
import {Wine} from "@/winery/domain/model/wine.entity.js";

export class WineAssembler {
    static toEntityFromResource(resource){
        const {id, wine, winery, location, image} = new WineResource(resource);
        return new Wine({id, name:wine, winery, location, image });
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}