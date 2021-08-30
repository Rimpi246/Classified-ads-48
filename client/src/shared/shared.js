// import { setupStretchy } from "./stretchy/setup-stretchy";
import { setupI18n } from "./i18n/setup-i18n";
import { setupHolmes } from "./search/setup-holmes";
import { setupAutoComplete } from "./search/setup-autocomplete";
import { setupPell } from "./editor/setup-pell";
import { setupInputTags } from "./tags/setup-input-tags";
import { setupFontPicker } from "./fonts/setup-font-picker";
import { setupLeaflet } from "./maps/setup-leaflet";
import { setupMaps } from "./maps/setup-maps";
import { setupGovAutoComplete } from "./auto-complete/setup-gov-auto-complete";
import { setupIlluAutoComplete } from "./auto-complete/setup-illu-auto-complete";
import { setupSocket } from "./socket/setup-socket";
import { runToasts } from "./toasts/toasts";
import { loadFile } from "./load-file/load-file";
import { dateFromObjectId } from "./formatters/date-from-objectId";

export const setupShared = async () => {
  const log = window.log;
  // setupStretchy();
  const promises = [
    setupI18n(), 
    setupHolmes(), 
    setupAutoComplete(), 
    setupPell(), 
    setupInputTags(), 
    setupFontPicker(), 
    setupLeaflet(), 
    setupMaps(), 
    setupGovAutoComplete(), 
    setupIlluAutoComplete(), 
    setupSocket(), 
    runToasts()
  ];
  const logPromises = (results) => results.forEach((result) => log.info(result));
  // Reject as soon as possible for dev environments
  // More permissive for production environment.
  // Counterintuitive huh ?
  if (['development', 'local'].includes(process.env.NODE_ENV))
    Promise.all(promises).then((results) => logPromises(results));
  else
    Promise.allSettled(promises).then((results) => logPromises(results));    
  
  // Global objects
  window["loadFile"] = loadFile;
  window["dateFromObjectId"] = dateFromObjectId;
};
