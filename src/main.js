import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import i18n from "@/i18n.js";
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import pinia from "@/pinia.js";
import {Button, Card, Column, DataTable, InputNumber, Message, Select, SelectButton, Toolbar} from "primevue";
import router from "@/router.js";

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

createApp(App)

    .component('pv-button',        Button)
    .component('pv-card',          Card)
    .component('pv-input-number',  InputNumber)
    .component('pv-message',       Message)
    .component('pv-select',        Select)
    .component('pv-select-button', SelectButton)
    .component('pv-toolbar',       Toolbar)
    .use(pinia)
    .use(PrimeVue, {theme: { preset: Material}, ripple: true, license: primeUiLicenseKey})
    .use(i18n)
    .use(router)
    .mount('#app')
