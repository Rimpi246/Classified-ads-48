import L from "leaflet";
import { moveableMarker } from "./helpers/marker/setup-marker";
const borders = require ('../../../data/borders.json');
let map;
let circle;
let lastValid;
const coordinates = borders.features[0].geometry.coordinates[0];
const latLngs = [];
const osmUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const osmAttrib = "Map data &copy; OpenStreetMap contributors";
let moveable;
/**
 * create a listing's Map
 */
export function listingMap({ lat, lng, zoom, layerFactory }) {
  map = new L.Map("listing-map");
  map.name = "listingMap";
  map.addLayer(layerFactory(osmUrl, osmAttrib, true));
  map.setView(new L.LatLng(lat, lng), zoom);
  // transform geojson coordinates into an array of L.LatLng
  for (let i = 0; i < coordinates.length; i++) {
    latLngs.push(new L.LatLng(coordinates[i][1], coordinates[i][0]));
  }
  L.mask(latLngs).addTo(map);
  // console.log(names);
  circle = L.circle([lat, lng], 6000).addTo(map);
  lastValid = [lat, lng];
  [moveable, lastValid] = moveableMarker(map, circle, coordinates);
  // Refresh tiles after some time
  // because it doesn't load properly at first
  setTimeout(() => {
    map.invalidateSize();
  }, 3000);
  return map;
}
