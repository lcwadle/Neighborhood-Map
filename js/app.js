var Business = function(rating, price, phone, id, review_count, name,
    lattitude, longitude, image_url) {
  this.rating = rating;
  this.price = price;
  this.phone = phone;
  this.id = id;
  this.review_count = ko.observable(review_count);
  this.name = name;
  this.lattitude = lattitude;
  this.longitude = longitude;
  this.image_url = image_url;
}

var viewModel = {
  businesses: []
};

viewModel.businesses.push(new Business(4, "$", "+14152520800",
  "four-barrel-coffee-san-francisco",
  738, "Four Barrel Coffee", 7.7670169511878, -122.42184275,
  "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg"));

ko.applyBindings(viewModel);

/*
function yelpQuery() {
  var yelp_url = "https://api.yelp.com/v3/businesses/search"
  var term = "restaurants"
  var lattiude = 30.2672
  var longitude = -97.7431

  // Build yelp url string
  yelp_url = yelp_url + "?term=" + term
  yelp_url = yelp_url + "&lattitude=" + lattitude
  yelp_url = yelp_url + "&longitude=" + longitude

  // Get yelp JSON business data
  $.getJSON(yelp_url, function(data) {
    var businesses = data["businesses"]
    for business in businesses {

    }
  });
}
*/
