<script setup>
import {useI18n} from "vue-i18n";
import StorageItemForm from "@/cellaring/presentation/components/storage-item-form.vue";

const {t} = useI18n();
</script>

<template>
  <section class ="p-3 md:p-5 flex flex-column align-items-center" aria-labelledby="new-storage-item-title">
    <h1 id = "new-storage-item-title" class ="text-4xl font-bold mt-0">
      {{t('new-storage-item.title')}}
    </h1>

    <p class = "line-height-3 text-color-secondary">{{t('new-storage-item.subtitle')}}</p>
    <storage-item-form/>
  </section>
</template>

<style scoped>

</style>