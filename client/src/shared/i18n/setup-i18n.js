import { getCookies } from "./helpers/get-cookies";
import { jsI18n } from "./helpers/vendors/jsi18n";
import {
  __ar_translations,
  __en_translations,
  __fr_translations,
} from "./translations";
import { langSelect } from "./lang-select";

export const setupI18n = () => {
  return new Promise(function(resolve, reject) {
    try {
      jsI18n.addLocale("ar", __ar_translations);
      jsI18n.addLocale("fr", __fr_translations);
      jsI18n.addLocale("en", __en_translations);
    

      // BASED ON LOCALE SET THE DEFAULT SELECT INPUT OPTION
      const lower_right = document.querySelector("#lower_right");
      const cookizz = getCookies();
      if (cookizz.locale) {
        jsI18n.setLocale(cookizz.locale);
        jsI18n.processPage();
        // document.body.setAttribute('lang', cookizz.locale);
        if (cookizz.locale === "ar") {
          document.body.setAttribute("dir", "rtl");
          lower_right.style.right = "auto";
          lower_right.style.left = "5%";
        }
        const langOptions = document.getElementsByTagName("option");
        const opt = [...langOptions].filter(
          (opt) => opt.value === cookizz.locale
        )[0];
        opt.selected = "selected";
        console.log("SET LANGUAGE TO: " + cookizz.locale);
      }
      window["langSelect"] = langSelect;
      return resolve('### function "setupI18n" run successfully');
    } catch (error) {
      return reject(new Error('### function "setupI18n" failed'));
    }
  });
};
