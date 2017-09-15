// Google Maps
var map;
var markers = [];
var bounds;
var largeInfoWindow;

// Business Object
var Business = function(rating, price, phone, id, review_count, name,
    lattitude, longitude, image_url, marker) {
  this.rating = rating;
  this.price = price;
  this.phone = phone;
  this.id = id;
  this.review_count = ko.observable(review_count);
  this.name = ko.observable(name);
  this.latitude = latitude;
  this.longitude = longitude;
  this.image_url = image_url;
  this.marker = marker;
  this.displayed = ko.observable(true);
  this.detailed = ko.observable(false);
};

// View Model
var viewModel = {
  businesses: ko.observableArray([])
};

// Add Business to View Model
viewModel.addBusiness = function(business) {
  viewModel.businesses.push(business);
};

// Filter Businesses by rating
viewModel.showBusinessesbyRating = function(stars) {
  for (var i = 0; i < viewModel.businesses().length; i++) {
    if (stars === 0) {
      viewModel.businesses()[i].marker.setMap(map);
      viewModel.businesses()[i].displayed(true);
    } else if (viewModel.businesses()[i].rating >= stars && viewModel.businesses()[i].rating < stars + 1) {
      viewModel.businesses()[i].marker.setMap(map);
      viewModel.businesses()[i].displayed(true);
    } else {
      viewModel.businesses()[i].marker.setMap(null);
      viewModel.businesses()[i].displayed(false);
    }
  }
};

// Show Hide Business details on list view
function showBusinessInfo(id) {
    for (var i = 0; i < viewModel.businesses().length; i++) {
      if (viewModel.businesses()[i].id == id) {
        viewModel.businesses()[i].detailed(true);
        viewModel.businesses()[i].marker.setAnimation(google.maps.Animation.BOUNCE);
      }
      else {
        viewModel.businesses()[i].detailed(false);
        viewModel.businesses()[i].marker.setAnimation(null);
      }
    }
}

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
  headers: {'Authorization': "Bearer " + access_token},
  success: function(data) {
    $.each(data.businesses, function (index, value) {
      var marker = new google.maps.Marker({
          map: map,
          position: { lat: value.coordinates.latitude, lng: value.coordinates.longitude },
          title: value.name,
          animation: google.maps.Animation.DROP,
          id: value.id,
          image_url: value.image_url,
          rating: value.rating,
          price: value.price,
          phone: value.phone,
          review_count: value.review_count
        });

        viewModel.addBusiness(new Business(value.rating, value.price,
          value.phone, value.id, value.review_count, value.name, value.coordinates.latitude,
          value.coordinates.longitude, value.image_url, marker));

      bounds.extend(marker.position);
      marker.setMap(map);

      marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
          });
    });
    map.fitBounds(bounds);
  }
}).fail(function(e) {
  $("#errors").text("Failed to load Yelp data");
});

ko.applyBindings(viewModel);

// Create infowindow when marker is clicked
function populateInfoWindow(marker, infowindow) {
        // Marker animation
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent(
            "<div class='infoWindow'>" +
              '<h2>' + marker.title + '</h2>' +
              '<img src=' + marker.image_url + ' />' +
              '<h4> Phone: ' + marker.phone + '</h4>' +
              '<h4> Price: ' + marker.price + '</h4>' +
              '<h4> Rating: ' + marker.rating +
                "<i class='fa fa-star'></i>" + '</h4>' +
            '</div>'
          );

          infowindow.open(map, marker);

          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker.setAnimation(null);
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
