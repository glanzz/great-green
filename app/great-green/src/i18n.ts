import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

const base = import.meta.env.BASE_URL || "";
i18n.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng:'en',
        fallbackLng: 'en',
        ns: ['common'], 
        backend: {
            loadPath: base + '/i18n/{{lng}}/{{ns}}.json'
        },
        interpolation: {
            escapeValue:false
        }
    });

export default i18n;