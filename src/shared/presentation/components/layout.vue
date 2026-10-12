<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './language-switcher.vue';

const { t } = useI18n();

const logoUrl = `${import.meta.env.VITE_LOGO_API_URL}?token=${import.meta.env.VITE_LOGO_API_KEY}&format=webp&retina=true`;

const items = [
  { label: 'option.home', to: '/home' },
  { label: 'option.new-storage-item', to: '/storage/items/new' }
];
</script>

<template>
  <header>
    <pv-toolbar class="bg-primary">
      <template #start>
        <div class="flex align-items-center gap-2">
          <img :src="logoUrl" :alt="t('app.logo-alt')" class="w-3rem h-3rem bg-white border-round"/>
          <span class="font-bold text-lg">{{ t('app.title') }}</span>
        </div>
      </template>

      <template #center>
        <nav :aria-label="t('navigation.main')" class="flex gap-2">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">
              {{ t(item.label) }}
            </router-link>
          </pv-button>
        </nav>
      </template>

      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
  </header>

  <main>
    <router-view/>
  </main>
</template>