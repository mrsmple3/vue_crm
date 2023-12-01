import store from "@/store";

const locales = {
  "ru-RU": {
    ProfileTitle: "Профиль",
  },
  "en-US": {
    ProfileTitle: "Profile",
  },
};

export default function locolizeFilter(key) {
  const locale = store.getters.info.locale || "ru-RU";
  return locales[locale][key] || `[Locolize error]: key ${key} not found`;
}
