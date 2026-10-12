import {BaseApi} from "@/shared/infrastructure/base-api.js";
import {BaseEndpoint} from "@/shared/infrastructure/base-endpoint.js";

const wineryApiUrl = import.meta.env.VITE_WINERY_API_URL;

export class WineryApi extends BaseApi{
    constructor() {
        super(wineryApiUrl);
    }

    getWinesByWineType(wineType) {
        return new BaseEndpoint(this, `/${wineType}`).getAll();
    }
}