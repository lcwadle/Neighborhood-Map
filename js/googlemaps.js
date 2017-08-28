var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2672, lng: -97.7431},
    zoom: 13
  });
  /*
  var tribeca = {lat: 30.2672, lng: -97.7431};
  var marker = new google.maps.Marker({
    position: tribeca,
    map: map,
    title: 'First Marker!'
  });
  var infowindow = new google.maps.InfoWindow({
    content: 'Info Window content'
  });
  marker.addListener('click', function(){
    infowindow.open(map, marker);
  });
  */
}
