import * as L from "leaflet";
import { moveableMarker } from "./helpers/marker/setup-marker";
const borders = require ('../../../data/borders.json');

import 'leaflet.fullscreen';
import screenfull from 'screenfull';
window.screenfull = screenfull;

let map;
let circle;
let lastValid;
const coordinates = borders.features[0].geometry.coordinates[0];
const latLngs = [];
const osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const osmAttrib = "Map data &copy; OpenStreetMap contributors";
let moveable;
/**
 * create geo-search's Map
 */
export function geoSearchMap({ lat, lng, layerFactory, clusterFactory, zoom }) {
  map = new L.Map("geo-search-map");
  map.name = "geoSearchMap";
  map.addLayer(layerFactory(osmUrl, osmAttrib, true));
  map.setView(new L.LatLng(lat, lng), zoom);
  // create a fullscreen button and add it to the map
  L.control.fullscreen({
    position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
    title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
    titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
    content: null, // change the content of the button, can be HTML, default null
    forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
    forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
    fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
  }).addTo(map);
  // transform geojson coordinates into an array of L.LatLng
  for (let i = 0; i < coordinates.length; i++) {
    latLngs.push(new L.LatLng(coordinates[i][1], coordinates[i][0]));
  }
  L.mask(latLngs).addTo(map);
  // 6*4 KM
  circle = L.circle([lat, lng], 6000*4).addTo(map);
  console.log(circle);
  lastValid = [lat, lng];
  [moveable, lastValid] = moveableMarker(map, circle, coordinates);
  map.addLayer(clusterFactory());
  // Refresh tiles after some time
  // because it doesn't load properly at first
  setTimeout(() => {
    map.invalidateSize();
  }, 3000);
  return map;
}
