
var mymap = L.map('mapid').setView([52.521918, 13.4132159], 11
);

var base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

console.log(data)
categories = {}
for (marker of data) {
    if (Object.keys(marker).length === 0) {
        continue;
    }
    for (category of marker.category) {
        (categories[category] = categories.category || []).push(L.marker([marker.lat, marker.lon]).bindPopup(`<h1>${marker.name}</h1><br>${marker.category}<br><img src="static/img/${marker.filename}" "><a href="${marker.website}" target="_blank" rel="noopener noreferrer">zur Webseite</a><br>${marker.info}<br><a href="http://www.google.com/maps/place/${marker.lat},${marker.lon}" target="_blank" rel="noopener noreferrer">Ort bei Google Maps</a>`).on('click', function (e) {
            mymap.setView(e.latlng, 13);
        }));
    }
}

for (key of Object.keys(categories)) {
    categories[key] = L.layerGroup(categories[key]).addTo(mymap)
}


var control = L.control.layers({ "Karte": base }, categories, options = {
    "hideSingleBase": true,
    "sortLayers": true,
    "collapsed": false

}).addTo(mymap);

//mymap.locate({ setView: true, maxZoom: 11 });