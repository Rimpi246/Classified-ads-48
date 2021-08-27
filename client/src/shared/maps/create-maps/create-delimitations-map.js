import L from "leaflet";
import { styleStatesClosure } from "./helpers/style-states";
import { onEachFeature } from "./helpers/on-each-feature/on-each-feature";
const states = require ('../../../data/states.json');
import { geoJson, map } from "./state";
import 'leaflet.fullscreen';
import screenfull from 'screenfull';
window.screenfull = screenfull;
/**
 * create delimitations's Map
 */
// https://leafletjs.com/examples/geojson/
// const myLayer = L.geoJSON().addTo(map2);
// myLayer.addData(__health);
// myLayer.eachLayer(function(layer) {
//   layer.bindPopup(layer.feature.properties.name);
// });
const osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const osmAttrib = "Map data &copy; OpenStreetMap contributors";

export function delimitationsMap({ lat, lng, layerFactory, zoom }) {
  map.current = new L.Map("delimitations-map");
  map.name = "delimitationsMap";
  map.current.addLayer(layerFactory(osmUrl, osmAttrib, false));
  map.current.setView(new L.LatLng(lat, lng), zoom);
  geoJson.current = L.geoJson(states, {
    style: styleStatesClosure(map),
    onEachFeature,
  }).addTo(map.current);
  // geoJson.eachLayer(function(layer) {
  //   layer.bindPopup(layer.feature.properties.name);
  // });
  setTimeout(() => {
    map.current.invalidateSize();
  }, 3000);
  return map;
}
