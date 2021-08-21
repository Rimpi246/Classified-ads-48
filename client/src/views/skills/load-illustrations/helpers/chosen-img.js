// Hopefully this stays online for a while
// https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.
// ssl.cf5.rackcdn.com/illustrations/
import { LIS } from "../../../../helpers/lis";
import { lightbox } from "../state/lightbox";
import { pastColor } from "../state/past-color";

/**
 * chosen Img
 * @param {dom} radio
 */
export function chosenImg(radio) {
  const svgURL = lightbox.current.items[radio.id];
  const chosen = svgURL.split("/")[4].split(".")[0];
  if (chosen) {
    const undrawInput = LIS.id("undraw");
    undrawInput.value = chosen + pastColor.current;
  }
}
