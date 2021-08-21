import { getCookies } from "../shared/i18n/helpers/get-cookies";
import { __states } from "./country";

export const getDzStateNames = () => {
  return getCookies().locale !== "ar"
    ? __states.features.map((a) => a.properties.name)
    : __states.features.map((a) => a.properties.name_ar);
};
