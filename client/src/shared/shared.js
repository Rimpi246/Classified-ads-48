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

export const setupShared = () => {
  // setupStretchy();
  setupI18n();
  setupHolmes();
  setupAutoComplete();
  setupPell();
  setupInputTags();
  setupFontPicker();
  setupLeaflet();
  setupMaps();
  setupGovAutoComplete();
  setupIlluAutoComplete();
  setupSocket();
  runToasts();
  
  window["loadFile"] = loadFile;
  window["dateFromObjectId"] = dateFromObjectId;
};
