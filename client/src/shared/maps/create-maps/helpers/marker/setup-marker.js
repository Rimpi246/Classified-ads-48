import { isMarkerInsidePolygon } from "./is-marker-inside-polygon";
import { __states } from "../../../../../data/country";
import { LIS } from "../../../../../helpers/lis";
import { getDzStateNames } from "../../../../../data/get-dz-state-names";
const polygon = __states.features.map((a) => a.geometry.coordinates[0]);
/**
 * Attach one marker to map with constraints (marker is draggble but cannot go out of )
 * Based on __borders and __states (country borders and Wilayas delimitations)
 * @param {map} map
 * @param {marker} marker
 * @param coordinates
 * @return {(marker|*[])[]} Just a reference
 */
export function moveableMarker(map, marker, coordinates) {
  const names = getDzStateNames();
  let lastValid = [];
  /**
   * blablabla (0_o)
   * @param {@@} evt
   */
  function trackCursor(evt) {
    marker.setLatLng(evt.latlng);
  }

  marker.on("mousedown", () => {
    map.dragging.disable();
    map.on("mousemove", trackCursor);
  });

  marker.on("mouseup", () => {
    map.dragging.enable();
    map.off("mousemove", trackCursor);
    const where = polygon.findIndex((coo) =>
      isMarkerInsidePolygon(marker, coo)
    );
    if (isMarkerInsidePolygon(marker, coordinates)) {
      const center = marker.getBounds().getCenter();
      if(map.name === 'map1') {
        LIS.id("lat").value = center.lat;
        LIS.id("lng").value = center.lng;
        LIS.id("div").value = names[where];
      } else if(map.name === 'geoSearchMap') {
        LIS.id("lat3").value = center.lat;
        LIS.id("lng3").value = center.lng;
      }
      lastValid = [center.lat, center.lng];
    } else {
      marker.setLatLng(lastValid);
    }
  });

  return [marker, lastValid];
}
