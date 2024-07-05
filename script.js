var map = L.map("map").setView([45.269722333, 19.804772791], 13); // Set initial view coordinates and zoom level

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var parcelLayer;

function addFilteredParcelsToMap(filteredParcels) {
  if (parcelLayer) {
    map.removeLayer(parcelLayer);
  }

  parcelLayer = L.geoJSON(filteredParcels, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "<b>Broj Parcele:</b> " +
          feature.properties.parcela_id +
          "<br><b>Povrsina:</b> " +
          feature.properties.area
      );
    },
  }).addTo(map);

  map.fitBounds(parcelLayer.getBounds());
}

function filterParcels() {
  var minArea = parseInt(document.getElementById("minAreaInput").value.trim());
  var maxArea = parseInt(document.getElementById("maxAreaInput").value.trim());

  if (isNaN(minArea) || isNaN(maxArea)) {
    alert("Unesi validne podatke!");
    return;
  }

  var filteredParcels = {
    type: "FeatureCollection",
    features: parcels.features.filter(function (feature) {
      var area = feature.properties.area;
      return area >= minArea && area <= maxArea;
    }),
  };

  addFilteredParcelsToMap(filteredParcels);
}

map.eachLayer(function (layer) {
  if (layer instanceof L.GeoJSON) {
    map.removeLayer(layer);
  }
});
