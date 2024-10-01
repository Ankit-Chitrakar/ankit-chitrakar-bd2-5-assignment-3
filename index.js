const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const hotels = require('./hotel.js');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

// sort according to pricining
const sortedHotelsByPricing = (pricing) => (hotel1, hotel2) => {
  if (pricing === 'high-to-low') {
    return hotel2.price - hotel1.price; // high to low
  } else {
    return hotel1.price - hotel2.price; // low to high
  }
};

// sort according to rating
const sortedHotelsByRating = (rating) => (hotel1, hotel2) => {
  if (rating === 'high-to-low') {
    return hotel2.rating - hotel1.rating; // high to low
  } else {
    return hotel1.rating - hotel2.rating; // low to high
  }
};

// sort according to reviews
const sortedHotelsByReviews = (reviews) => (hotel1, hotel2) => {
  if (reviews === 'most-to-least') {
    return hotel2.reviews - hotel1.reviews; // high to low
  } else {
    return hotel1.reviews - hotel2.reviews; // low to high
  }
};

// sort hotels ascending order based on price
const sortHotelPriceASC = (hotel1, hotel2) => {
  return hotel1.price - hotel2.price;
};

// Endpoint 1: Get the hotels sorted by pricing
app.get('/hotels/sort/pricing', (req, res) => {
  let pricing = req.query.pricing;

  let hotesCopy = hotels.slice();
  let sortedHotels = hotesCopy.sort(sortedHotelsByPricing(pricing));

  res.json({ hotels: sortedHotels });
});

// Endpoint 2: Get the hotels sorted based on their Ratings
app.get('/hotels/sort/rating', (req, res) => {
  let rating = req.query.rating;

  let hotesCopy = hotels.slice();
  let sortedHotels = hotesCopy.sort(sortedHotelsByRating(rating));

  res.json({ hotels: sortedHotels });
});

// Endpoint 3: Get the Hotels sorted based on their Reviews
app.get('/hotels/sort/reviews', (req, res) => {
  let reviews = req.query.reviews;

  let hotesCopy = hotels.slice();
  let sortedHotels = hotesCopy.sort(sortedHotelsByReviews(reviews));

  res.json({ hotels: sortedHotels });
});

// Endpoint 4: Filter the hotels based on the Hotel Amenity
app.get('/hotels/filter/amenity', (req, res) => {
  let amenity = req.query.amenity;

  let filter_amenity = hotels.filter(
    (hotel) => hotel.amenity.toLowerCase() === amenity.toLowerCase()
  );

  // sort asc to the filter_amenity based on price
  let hotelsCopy = filter_amenity.slice();
  let sortedHotels = hotelsCopy.sort(sortHotelPriceASC);

  res.json({ hotels: sortedHotels });
});

// Endpoint 5: Filter the hotels based on the selected Country
app.get('/hotels/filter/country', (req, res) => {
  let country = req.query.country;

  let filter_country = hotels.filter(
    (hotel) => hotel.country.toLowerCase() === country.toLowerCase()
  );

  // sort asc to the filter_country based on price
  let hotelsCopy = filter_country.slice();
  let sortedHotels = hotelsCopy.sort(sortHotelPriceASC);

  res.json({ hotels: sortedHotels });
});

// Endpoint 6: Filter the hotels based on the selected Category
app.get('/hotels/filter/category', (req, res) => {
  let category = req.query.category;

  let filter_category = hotels.filter(
    (hotel) => hotel.category.toLowerCase() === category.toLowerCase()
  );

  // sort asc to the filter_category based on price
  let hotelsCopy = filter_category.slice();
  let sortedHotels = hotelsCopy.sort(sortHotelPriceASC);

  res.json({ hotels: sortedHotels });
});

// Endpoint 7: Send all hotels
app.get('/hotels', (req, res) => {
  res.json({ hotels: hotels });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
