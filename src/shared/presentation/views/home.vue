<script setup>
  import {useI18n} from "vue-i18n";
  import MyWineCellars from "@/cellaring/presentation/components/my-wine-cellars.vue";

  const {t}= useI18n();
</script>

<template>
  <section class = "p-3 md:p-5" aria-labelledby="home-title">
    <h1 id = "home-title" class = "text-4xl" font-bold mt-0>{{t('home.title')}}</h1>
    <p class = "line-height-3 text-color-secondary">{{t('home.content')}}</p>
    <my-wine-cellars/>
  </section>
</template>

<style scoped>

</style>