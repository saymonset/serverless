import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, es } from "./translation";

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    }
}

i18next.use(initReactI18next).init({
    debug: false,
    lng: 'en',
    compatibilityJSON: 'v3',
    //language to use if translation in user language is not available
    fallbackLng: 'en',
    resources,
  })
  
  export default i18next;