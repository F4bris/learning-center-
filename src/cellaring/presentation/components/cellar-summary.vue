<script setup>
/**
 * Cellar summary.
 *
 * @summary Card with the cellar name, its wines (name and quantity), total bottles and available capacity.
 * @author Roberto Gonzales Ayala
 */
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  /** @type {import('../../domain/model/cellar-summary.entity.js').CellarSummary} Summary to display. */
  summary: { type: Object, required: true }
});

const { t, locale } = useI18n();

const numberFormat = computed(() => new Intl.NumberFormat(locale.value));
</script>

<template>
  <pv-card>
    <template #header>
      <h3 class="m-0 p-3 text-xl">{{ summary.cellar.name }}</h3>
    </template>
    <template #content>
      <p v-if="summary.isEmpty" class="m-0 text-color-secondary">{{ t('cellar-summary.empty') }}</p>
      <ul v-else class="list-none m-0 p-0">
        <li v-for="storageItem in summary.storageItems" :key="storageItem.id"
            class="flex justify-content-between py-1">
          <span>{{ storageItem.wineName }}</span>
          <span :aria-label="t('cellar-summary.quantity')">{{ numberFormat.format(storageItem.quantity) }}</span>
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="flex justify-content-between">
        <span>{{ t('cellar-summary.total-bottles') }}: <strong>{{ numberFormat.format(summary.totalBottles) }}</strong></span>
        <span>{{ t('cellar-summary.available-capacity') }}: <strong>{{ numberFormat.format(summary.availableCapacity) }}</strong></span>
      </div>
    </template>
  </pv-card>
</template>