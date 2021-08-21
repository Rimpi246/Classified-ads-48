import { map } from "../../../state";
/**
 * zoom To Feature
 * @param {*} e
 */
import {APIHost} from "../../../../../../consts";

export function zoomThenRedirect(e) {
  map.current.fitBounds(e.target.getBounds());
  const division = e.target.feature.properties.name;
  window.location.href = `${APIHost[process.env.NODE_ENV]}/division/${division}`;
}
