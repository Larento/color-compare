import { createApp } from 'vue'
import { createGettext, type GetTextOptions } from 'vue3-gettext'

import App from './App.vue'
import translations from './language/translations.json'

const available_languages = {
    en: '🇺🇸 English',
    ru: '🇷🇺 Русский',
} as const satisfies GetTextOptions['availableLanguages']

const default_language = 'en' as const satisfies keyof typeof available_languages
const preferred_language = navigator.language.split('-')[0]

const gettext = createGettext({
    availableLanguages: available_languages,
    defaultLanguage: preferred_language in available_languages ? preferred_language : default_language,
    translations: translations,
})

createApp(App).use(gettext).mount(document.body)
