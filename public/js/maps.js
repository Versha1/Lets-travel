var platform = new H.service.Platform({
    'apikey': 'YhQ_OvasegVVd_AM9_EzPOMR1KifEeY6vlUXglI8kQ8'
    
  });
let landmark = document.querySelector('.main-heading').textContent;
  // Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Get an instance of the geocoding service:
var service = platform.getSearchService();

service.geocode({
  q: landmark
}, (result) => {
  console.log(result)
  var map = new H.Map(
    document.getElementById('map-container'),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: result.items[0].position
    });



  // Add a marker for each location found
  
}, alert);

// Instantiate (and display) a map object:
//result.items.forEach((item) => {
//  map.addObject(new H.map.Marker(item.position));
//});
// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):

