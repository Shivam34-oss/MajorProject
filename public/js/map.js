maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates, // <-- Yahan ab 'coordinates' variable use karein
    zoom: 9
});

const marker = new maptilersdk.Marker({ color: "red" })
    .setLngLat(coordinates) // <-- Yahan bhi 'coordinates'
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
        .setHTML(
            `<h4>${listingLocation}</h4><p>Exact location will be provided after booking</p>` // <-- Yahan 'locationName'
        )
    )
    .addTo(map);