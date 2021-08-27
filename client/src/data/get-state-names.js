import { getCookies } from "../shared/i18n/helpers/get-cookies";
const states = require ('./states.json');
// Expects geojson metadata:
// name: required - the name of the region (Default is English)
// name_{lang}: optional - the name of the region (Other languages)
// If feature.properties.name_{lang} doesn't exist, it falls to feature.properties.name (English)
export const getStateNames = () => {
  const lang = getCookies().locale;
  return lang === "en"
    ? states.features.map((f) => f.properties.name)
    : states.features.map((f) => f.properties[`name_${lang}`] || f.properties.name);
};
