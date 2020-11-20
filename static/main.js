









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
    var popUpHtml = `
            <h4 class="card-title">${marker.name}</h4>
            <h6 class="text-muted card-subtitle mb-2">${(marker.category).join(" ").toUpperCase()}</h6><img class="rounded img-fluid" src="static/img/${marker.filename}">
            <h4>Infos:</h4>
            <p class="card-text">${(marker.info).replace(/\r\n/g, "<br>")}</p>
            <h4>Warum ist dieser Ort nachhaltig?</h4>
            <p class="card-text">${(marker.reason).replace(/\r\n/g, "<br>")}</p>
            <a href="${marker.website}" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-outline-info"> Webseite</button></a>
<a href="${marker.googlemaps}" target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-outline-info"> Google Maps</button></a>
`


    for (category of marker.category) {
        (categories[category] = categories.category || []).push(L.marker([marker.lat, marker.lon]).bindPopup(popUpHtml, options = {

            maxHeight: 500,
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