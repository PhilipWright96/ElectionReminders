import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// A helper to convert "en-GB" → "en"
function removeRegionCode(lang: string) {
    return lang.split("-")[0];
}

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        backend: {
            loadPath: (lngs: string[]) => {
                const lang = removeRegionCode(lngs[0]);
                return `/assets/i18n/${lang}.json`;
            }
        },
        detection: {
            order: ["navigator", "localStorage", "htmlTag"],
            lookupLocalStorage: "lng"
        },
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        },

        // Also disable returning Promises (prevents Suspense)
        returnEmptyString: false
    });

export default i18n;