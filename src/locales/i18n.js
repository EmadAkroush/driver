import { createI18n } from 'vue-i18n'
import dictionary from "@/locales/dictionary";

const i18n = createI18n({
    legacy: false,
    locale:'en',
    messages: dictionary
})

export default i18n;