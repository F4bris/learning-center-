<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import useCellaringStore from '../../application/cellaring.store.js';
import useWineryStore from '../../../winery/application/wine.store.js';

const { t } = useI18n();
const router = useRouter();
const cellaringStore = useCellaringStore();
const wineryStore = useWineryStore();
const { cellars } = storeToRefs(cellaringStore);
const { loading: loadingWines } = storeToRefs(wineryStore);

const selectedWineType = ref(null);
const selectedWine = ref(null);
const quantity = ref(1);
const errorMessage = ref('');

const wineTypes = computed(() => cellars.value.map(cellar => ({
  value: cellar.wineType,
  label: t(`wine-types.${cellar.wineType}`)
})));

const wines = computed(() => wineryStore.getWinesByType(selectedWineType.value));
const availableCapacity = computed(() => cellaringStore.getAvailableCapacity(selectedWineType.value));
const exceedsCapacity = computed(() => selectedWineType.value !== null && (quantity.value ?? 0) > availableCapacity.value);
const isValid = computed(() => selectedWine.value !== null && (quantity.value ?? 0) >= 1 && !exceedsCapacity.value);

onMounted(() => cellaringStore.fetchCellaringData());

watch(selectedWineType, (wineType) => {
  selectedWine.value = null;
  if (wineType) wineryStore.fetchWinesByType(wineType);
});

async function create() {
  if (!isValid.value) return;
  errorMessage.value = '';
  try {
    await cellaringStore.addStorageItem({
      wineType: selectedWineType.value,
      wineId: selectedWine.value.id,
      wineName: selectedWine.value.name,
      quantity: quantity.value
    });
    router.push('/home');
  } catch (error) {
    errorMessage.value = error.message;
  }
}

function cancel() {
  router.push('/home');
}
</script>

<template>
  <form class="flex flex-column gap-4" style="max-width: 32rem" @submit.prevent="create">
    <div class="flex flex-column gap-2">
      <label for="wine-type">{{ t('storage-item-form.wine-type') }}</label>
      <pv-select v-model="selectedWineType" input-id="wine-type" :options="wineTypes"
                 option-label="label" option-value="value"
                 :placeholder="t('storage-item-form.select-wine-type')" fluid/>
    </div>
    <div class="flex flex-column gap-2">
      <label for="wine">{{ t('storage-item-form.wine') }}</label>
      <pv-select v-model="selectedWine" input-id="wine" :options="wines" option-label="name" filter
                 :disabled="!selectedWineType" :loading="loadingWines"
                 :placeholder="t('storage-item-form.select-wine')" fluid/>
    </div>
    <div class="flex flex-column gap-2">
      <label for="quantity">{{ t('storage-item-form.quantity') }}</label>
      <pv-input-number v-model="quantity" input-id="quantity" :min="1" show-buttons fluid
                       :invalid="exceedsCapacity"/>
      <small v-if="selectedWineType && !exceedsCapacity" class="text-color-secondary">
        {{ t('storage-item-form.available-capacity', { available: availableCapacity }) }}
      </small>
      <pv-message v-if="exceedsCapacity" severity="error" size="small">
        {{ t('storage-item-form.capacity-exceeded', { available: availableCapacity }) }}
      </pv-message>
    </div>
    <pv-message v-if="errorMessage" severity="error">{{ errorMessage }}</pv-message>
    <div class="flex gap-2">
      <pv-button type="submit" :label="t('storage-item-form.create')" icon="pi pi-check" :disabled="!isValid"/>
      <pv-button type="button" :label="t('storage-item-form.cancel')" icon="pi pi-times" severity="secondary"
                 @click="cancel"/>
    </div>
  </form>
</template>