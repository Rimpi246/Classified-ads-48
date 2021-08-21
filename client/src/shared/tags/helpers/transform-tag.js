// eslint-disable-next-line max-len
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TAGIFY @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// TODO: if not found
// The DOM element you wish to replace with Tagify
import { lightenDarkenColor } from "./colors/lighten-color";
import { stringToColour } from "../../maps/create-maps/helpers/string-to-colour";

/**
 * blablabla (0_o)
 * @param {@@} tagData
 */
export function transformTag(tagData) {
  tagData.style =
    "--tag-bg:" + lightenDarkenColor(stringToColour(tagData.value), 30);
}
