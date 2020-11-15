var mymap = L.map('mapid').setView([52.521918, 13.4132159], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

console.log(data)
for (marker of data) {
    if (Object.keys(marker).length === 0) {
        continue;
    }
    var marker = L.marker([marker.lat, marker.lon]).addTo(mymap).bindPopup(`<h1>${marker.name}</h1><img src="static/img/${marker.filename}" "><a href="${mark.website}"><br>${marker.info}<br>${marker.category}`);
}
