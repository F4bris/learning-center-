import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { CellaringApi } from '../infrastructure/cellaring-api.js';
import { CellarAssembler } from '../infrastructure/cellar.assembler.js';
import { StorageItemAssembler } from '../infrastructure/storage-item.assembler.js';
import { StorageItem } from '../domain/model/storage-item.entity.js';
import { CellarSummary } from '../domain/model/cellar-summary.entity.js';

const cellaringApi = new CellaringApi();

const useCellaringStore = defineStore('cellaring', () => {

    const cellars = ref([]);

    const storageItems = ref([]);

    const errors = ref([]);
    const loaded = ref(false);
    const loading = ref(false);

    const cellarSummaries = computed(() =>
        cellars.value.map(cellar => new CellarSummary({
            cellar,
            storageItems: storageItems.value.filter(storageItem => storageItem.cellarId === cellar.id)
        })));

    async function fetchCellaringData() {
        if (loaded.value || loading.value) return;
        loading.value = true;
        errors.value = [];
        try {
            const [cellarsResponse, storageItemsResponse] = await Promise.all([
                cellaringApi.getCellars(),
                cellaringApi.getStorageItems()
            ]);
            cellars.value = CellarAssembler.toEntitiesFromResponse(cellarsResponse);
            storageItems.value = StorageItemAssembler.toEntitiesFromResponse(storageItemsResponse);
            loaded.value = true;
        } catch (error) {
            errors.value.push(error);
        } finally {
            loading.value = false;
        }
    }

    function findSummaryByWineType(wineType) {
        return cellarSummaries.value.find(summary => summary.cellar.wineType === wineType) ?? null;
    }

    function getAvailableCapacity(wineType) {
        return findSummaryByWineType(wineType)?.availableCapacity ?? 0;
    }

    async function addStorageItem({ wineType, wineId, wineName, quantity }) {
        const summary = findSummaryByWineType(wineType);
        if (!summary) throw new Error(`There is no cellar for wine type ${wineType}`);
        if (quantity > summary.availableCapacity) {
            throw new Error(`Quantity ${quantity} exceeds the available capacity ${summary.availableCapacity}`);
        }
        const storageItem = new StorageItem({
            cellarId: summary.cellar.id, wineType, wineId, wineName, quantity,
            registeredAt: new Date().toISOString()
        });
        const response = await cellaringApi.createStorageItem(StorageItemAssembler.toCreateRequestFromEntity(storageItem));
        storageItems.value.push(StorageItemAssembler.toEntityFromResource(response.data));
    }

    return {
        cellars, storageItems, errors, loaded, loading, cellarSummaries,
        fetchCellaringData, findSummaryByWineType, getAvailableCapacity, addStorageItem
    };
});

export default useCellaringStore;