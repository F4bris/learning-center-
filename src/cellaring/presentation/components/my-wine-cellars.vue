<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import useCellaringStore from '../../application/cellaring.store.js';
import CellarSummary from './cellar-summary.vue';

const { t } = useI18n();
const store = useCellaringStore();
const { cellarSummaries, errors } = storeToRefs(store);

onMounted(() => store.fetchCellaringData());
</script>

<template>
  <section aria-labelledby="my-wine-cellars-title">
    <h2 id="my-wine-cellars-title" class="text-2xl font-semibold mt-0">{{ t('my-wine-cellars.title') }}</h2>
    <div class="grid">
      <div v-for="summary in cellarSummaries" :key="summary.cellar.id" class="col-12 md:col-6">
        <cellar-summary :summary="summary"/>
      </div>
    </div>
    <p v-if="errors.length" role="alert" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(error => error.message).join(', ') }}
    </p>
  </section>
</template>