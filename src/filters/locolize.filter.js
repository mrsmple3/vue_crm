import store from "@/store";
import ruRU from "@/locales/ruRu.json";
import enUS from "@/locales/enUS.json";

const locales = {
  "ru-RU": ruRU,
  "en-US": enUS,
};

export default function locolizeFilter(key) {
  const locale = store.getters.info.locale || "ru-RU";
  return locales[locale][key] || `[Locolize error]: key ${key} not found`;
}
