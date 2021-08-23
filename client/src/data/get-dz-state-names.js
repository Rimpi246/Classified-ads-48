import { getCookies } from "../shared/i18n/helpers/get-cookies";
const states = require ('./states.json');

export const getDzStateNames = () => {
  return getCookies().locale !== "ar"
    ? states.features.map((a) => a.properties.name)
    : states.features.map((a) => a.properties.name_ar);
};
