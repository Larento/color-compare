import { createApp } from 'vue'
import { createGettext } from 'vue3-gettext'

import App from './App.vue'
import translations from './language/translations.json'

const gettext = createGettext({
    availableLanguages: {
        en: 'English',
        ru: 'Русский',
    },
    defaultLanguage: 'en',
    translations: translations,
})

createApp(App).use(gettext).mount(document.body)
