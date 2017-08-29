// Google Maps
var map;
var markers = [];
var bounds;
var largeInfoWindow;

// Business Object
var Business = function(rating, price, phone, id, review_count, name,
    lattitude, longitude, image_url) {
  this.rating = rating;
  this.price = price;
  this.phone = phone;
  this.id = id;
  this.review_count = ko.observable(review_count);
  this.name = ko.observable(name);
  this.latitude = latitude;
  this.longitude = longitude;
  this.image_url = image_url;
}

// View Model
var viewModel = {
  businesses: ko.observableArray([])
};

// Yelp POST URL Paramaters
var yelp_post_url = "https://api.yelp.com/oauth2/token";
var grant_type = "client_credentials";
var client_id = "TnqsZVUWWL7mZMISCQPRzQ";
var client_secret = "MzE84237dSkcgNfLPEb6PuuOMrElFefie2wFFimOKM4yIPaRnW6mCkQC1RUUdGn8";

// Build Yelp URL String
yelp_post_url = yelp_post_url + "?grant_type=" + grant_type;
yelp_post_url = yelp_post_url + "&client_id=" + client_id;
yelp_post_url = yelp_post_url + "&client_secret=" + client_secret;

// Yelp Access token
var access_token = "w7-3rcA8zqaBpMU8e8iLJObLV_QQVtItNsP5dug3Cyhw6ml79N74hkPu3AjneQelrBw852xfQpo3zJbZKgKaflZy1Ya3NBfPaj0FT4ltN3_8_s2H-mRyK4l0J7qkWXYx";

/*
// Yelp Access Token
$.post({
  url: yelp_post_url,
  success: function(data) {
    access_token = data.access_token;
  }
});
*/

// Yelp GET URL Paramaters
var yelp_get_url = "https://cors-anywhere.herokuapp.com/" + "https://api.yelp.com/v3/businesses/search";
var term = "restaurants";
var latitude = 30.2672;
var longitude = -97.7431;

// Yelp GET URL String
yelp_get_url = yelp_get_url + "?term=" + term;
yelp_get_url = yelp_get_url + "&latitude=" + latitude;
yelp_get_url = yelp_get_url + "&longitude=" + longitude;

// Yelp GET JSON Request
$.ajax({
  dataType: "json",
  url: yelp_get_url,
  headers: {'Authorization': "Bearer w7-3rcA8zqaBpMU8e8iLJObLV_QQVtItNsP5dug3Cyhw6ml79N74hkPu3AjneQelrBw852xfQpo3zJbZKgKaflZy1Ya3NBfPaj0FT4ltN3_8_s2H-mRyK4l0J7qkWXYx"},
  success: function(data) {
    $.each(data.businesses, function (index, value) {
      viewModel.businesses.push(new Business(value.rating, value.price,
        value.phone, value.id, value.review_count, value.name, value.coordinates.latitude,
        value.coordinates.longitude, value.image_url));

      var marker = new google.maps.Marker({
          map: map,
          position: { lat: value.coordinates.latitude, lng: value.coordinates.longitude },
          title: value.name,
          animation: google.maps.Animation.DROP,
          id: value.id
        });

      markers.push(marker);
      bounds.extend(marker.position);
      marker.setMap(map);

      marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
          });
    });
    map.fitBounds(bounds);
  }
});

ko.applyBindings(viewModel);

function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.2672, lng: -97.7431},
    zoom: 13
  });

  largeInfoWindow = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();
}
