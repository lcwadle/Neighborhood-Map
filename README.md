# Neighborhood-Map

This is the code used to generate a website displaying 20 of the restaurants within Austin.  It allows users to filter restaurants by the number of "stars" they were rated.  It also allows users to click on a marker or a restaurant name to get additional information about the restaurant including a picture.  The information for the restaurant is taken from Yelp's business API.

## Structure
The code is written in Javascript, CSS, and HTML.  The Javascipt file consists of a model consisting of the businesses obtained from Yelp and their attributes.  It also consists of a view model to seperate the view from the model.  The view model includes multiple functions including, **showBusinessesByRating** which sets the attribute, **displayed**.  This attribute is responsible for displaying the business on the map and the list.  In addition there is a function, **showBusinessDetail** which displays the business details when the business is clicked in the list.

Additionally there is code to connect to the Yelp API, code to display the Google Map, and code to setup the Google Maps markers/infowindows.

## Todo
Add the ability to change location.  Right now the starting location is hard coded for a long/latt for Austin, TX.
Add the ability for the app to request an access token from Yelp.  Current the access token is hard coded and will expire within a month.
Allow the user to get more than 20 restaurants.
Add additional restaurant attributes.

## Usage
No additional setup is required to view the webpage.  Just open the index.html file within a browser.

## License
The content of this repository is licensed under a [MIT License](https://opensource.org/licenses/MIT)
