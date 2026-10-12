import { defineStore } from 'pinia';
import { ref } from 'vue';
import { WineryApi } from '../infrastructure/winery-api.js';
import { WineAssembler } from '../infrastructure/wine.assembler.js';

const wineryApi = new WineryApi();

const useWineryStore = defineStore('winery', () => {
    const winesByType = ref({});
    const loading = ref(false);
    const errors = ref([]);

    async function fetchWinesByType(wineType) {
        if (winesByType.value[wineType]) return;
        loading.value = true;
        errors.value = [];
        try {
            const response = await wineryApi.getWinesByWineType(wineType);
            winesByType.value[wineType] = WineAssembler.toEntitiesFromResponse(response);
        } catch (error) {
            errors.value.push(error);
        } finally {
            loading.value = false;
        }
    }

    function getWinesByType(wineType) {
        return winesByType.value[wineType] ?? [];
    }

    return { winesByType, loading, errors, fetchWinesByType, getWinesByType };
});

export default useWineryStore;