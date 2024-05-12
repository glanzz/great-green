import { i18n } from "i18next";
import { JOURNEY_STATUS } from "../store/journey-slice";

const LANG_PREF_KEY = "lang";

export const languageSelect = (i18n: i18n) => {
    const urlParams = new URLSearchParams(window.location.search);
    const language = urlParams.get('lang');
    if (language) { // Give first preference to params given
        const lkey = `${language}`
        console.log("Setting new value", lkey)
        i18n.changeLanguage(lkey);
        localStorage.setItem(LANG_PREF_KEY, lkey);
    } else {
        const cachedPref = localStorage.getItem(LANG_PREF_KEY);
        console.log("Cached Pref",cachedPref)
        if (cachedPref) {
            i18n.changeLanguage(cachedPref);
        }
    }
}


export const getNextStatus = (status: string) => {
  const statusList = Object.keys(JOURNEY_STATUS);
  const currentIndex = statusList.findIndex(s => s == status);
  return statusList[currentIndex + 1];
}