var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;

var OfferBox = require('./home.jsx');
var OfferDetail = require('./offer-detail.jsx');
var AddOfferForm = require('./add-offer.jsx');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" url="http://localhost:3000/offers" component={OfferBox} />
    <Route path="/offer-detail/:offerId" url="http://localhost:3000/offers/" component={OfferDetail} />
    <Route path="/add-offer" url="http://localhost:3000/offers/" component={AddOfferForm} />
  </Router>,
  document.getElementById('app')
);

