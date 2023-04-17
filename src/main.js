import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import {iconsSet as icons} from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import i18n from "@/locales/i18n"; //import if you want to enable language switch for user. make changes in AppHeader.vue and uncomment language_switcher.

// start: language setting when language switch is disabled for user
// you should specify html direction in /public/index.html based on language direction (rtl/ltr)
/*import {createI18n} from 'vue-i18n'
import dictionary from "@/locales/dictionary";

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: dictionary
})*/
// end: language setting when language switch is disabled for user

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(i18n)
app.use(VueCookies, {expires: '7d'})
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.component('DatePicker', Vue3PersianDatetimePicker);

app.mount('#app')
