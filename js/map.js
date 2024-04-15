const oamkCoordinates = [65.057, 25.467];

var map = L.map("map");
let userLocation;
let distance;
const shopMarker = L.marker(oamkCoordinates)
  .addTo(map)
  .bindPopup("WE ARE HERE", { autoClose: false })
  .openPopup();

// Function to handle successful retrieval of user's location
function onLocationFound(e) {
  var userLocation = e.latlng; // Get user's coordinates
  console.log("USER LOCATION", userLocation);
  L.marker(userLocation)
    .addTo(map) // Add a marker at the user's location
    .bindPopup("You are here", { autoClose: false })
    .openPopup(); // Optional: Show a popup

  distance = userLocation.distanceTo(shopMarker.getLatLng());

  // Adjust map's zoom level and position to fit both markers
  var bounds = L.latLngBounds([oamkCoordinates, userLocation]);
  map.fitBounds(bounds);
  alert(
    "We are approximately " +
      distance.toFixed(0) / 1000 +
      " kilometers away from you."
  );

  // Adjust zoom level further if distance between shop and user is too large
  if (distance > 2) {
    // Adjust this threshold as needed
    map.setZoom(map.getZoom() - 1); // Zoom out by one level
  }
}

// Function to handle errors in geolocation
function onLocationError(e) {
  alert(e.message); // Display error message
}

shopMarker.on("click", function (e) {
  map.setView(oamkCoordinates, 15); // Adjust zoom level and position to center on shop marker
});

// Options for geolocation
var geoOptions = {
  enableHighAccuracy: true, // Request high accuracy
  maximumAge: 30000, // Cache location for 30 seconds
  timeout: 10000, // Timeout after 10 seconds
};

// Request user's location
map.on("locationfound", onLocationFound); // Listen for location found event
map.on("locationerror", onLocationError); // Listen for location error event
map.locate(geoOptions); // Start locating the user

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
