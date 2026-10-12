import {StorageItemResource} from "@/cellaring/infrastructure/storage-item.resource.js";
import {StorageItem} from "@/cellaring/domain/model/storage-item.entity.js";
import {CreateStorageItemRequest} from "@/cellaring/infrastructure/create-storage-item.request.js";

export class StorageItemAssembler {
    static toEntityFromResource(resource){
        return new StorageItem({... new StorageItemResource(resource)});
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        return response.data.map(resource => this.toEntityFromResource(resource));
    }

    static toCreateRequestFromEntity(storageItem){
        return new CreateStorageItemRequest({ ...storageItem });
    }
}