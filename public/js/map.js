const key = window.MAP_TOKEN;   // <-- yahi se milega EJS ka token

const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${key}`,
      }),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([77.2090, 28.6139]),
    zoom: 10,
  }),
});

