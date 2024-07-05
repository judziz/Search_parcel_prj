// Initialize the map
var map = L.map("map").setView([51.505, -0.09], 13);

// Define base layers
var osmLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

var satelliteLayer = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 17,
    attribution:
      '&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors',
  }
);

// Add OSM layer to map
osmLayer.addTo(map);

// Create a layer control and add to map
var baseLayers = {
  OpenStreetMap: osmLayer,
  Satellite: satelliteLayer,
};

L.control.layers(baseLayers).addTo(map);

// Add custom legend
var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "custom-legend");
  div.innerHTML =
    "<button onclick=\"switchLayer('osm')\">OSM</button><button onclick=\"switchLayer('sat')\">Satellite</button>";
  return div;
};

legend.addTo(map);

// Switch layer function
function switchLayer(layer) {
  if (layer === "osm") {
    map.addLayer(osmLayer);
    map.removeLayer(satelliteLayer);
  } else if (layer === "sat") {
    map.addLayer(satelliteLayer);
    map.removeLayer(osmLayer);
  }
}
