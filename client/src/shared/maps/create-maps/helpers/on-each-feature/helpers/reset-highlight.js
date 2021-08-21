/**
 * resets Highlight
 * @param {*} e
 */
import { geoJson } from "../../../state";

export function resetHighlight(e) {
  geoJson.current.resetStyle(e.target);
}
