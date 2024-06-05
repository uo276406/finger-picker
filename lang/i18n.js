import i18n from "i18next";
import { NativeModules, Platform } from "react-native";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import es from "./es.json";

const resources = {
  en: en,
  es: es,
};

const getDeviceLanguage = () => {
  const locale =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  return locale ? locale.replace("_", "-") : "en";
};

i18n

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: "v3",
    resources,
    lng: getDeviceLanguage(),
  });

export default { i18n };
