import {Cellar} from "@/cellaring/domain/model/cellar.entity.js";
import {CellarResource} from "@/cellaring/infrastructure/cellar.resource.js";

export class CellarAssembler{
    static toEntityFromResource(resource){
        return new Cellar ({... new CellarResource(resource)})
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}