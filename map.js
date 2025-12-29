
const map = L.map('map').setView([22.5, 78.9], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const states = {
  KA: "Karnataka",
  MH: "Maharashtra",
  UP: "Uttar Pradesh"
};

const select = document.getElementById("stateSelect");
Object.entries(states).forEach(([code, name]) => {
  const o = document.createElement("option");
  o.value = code;
  o.textContent = name;
  select.appendChild(o);
});

let layer;
select.onchange = async () => {
  if (layer) map.removeLayer(layer);
  const code = select.value;
  if (!code) return;
  const res = await fetch(`geojson/${code}.geojson`);
  const data = await res.json();
  layer = L.geoJSON(data, {
    onEachFeature: (f, l) => {
      l.on('click', () => l.setStyle({fillColor: '#ffcc00', fillOpacity: 0.7}));
      l.bindTooltip(f.properties.district);
    }
  }).addTo(map);
  map.fitBounds(layer.getBounds());
};
