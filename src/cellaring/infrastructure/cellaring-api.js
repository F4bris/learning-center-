import {BaseApi} from "@/shared/infrastructure/base-api.js";
import {BaseEndpoint} from "@/shared/infrastructure/base-endpoint.js";

const cellarsEndpointPath = import.meta.env.VITE_CELLARS_ENDPOINT_PATH;
const storageItemsEndpointPath = import.meta.env.VITE_STORAGE_ITEMS_ENDPOINT_PATH;

export class CellaringApi extends BaseApi {
    #cellarsEndpoint;
    #storageItemsEndpoint;

    constructor (){
        super();
        this.#cellarsEndpoint = new BaseEndpoint(this, cellarsEndpointPath);
        this.#storageItemsEndpoint = new BaseEndpoint(this, storageItemsEndpointPath);
    }

    getCellars(){
        return this.#cellarsEndpoint.getAll();
    }

    getStorageItems(){
        return this.#storageItemsEndpoint.getAll();
    }

    createStorageItem(request){
        return this.#storageItemsEndpoint.create(request);
    }
}