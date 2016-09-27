var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./app.jsx');
var OfferListContainer = require('./offer-list.jsx');
var OfferDetail = require('./offer-detail.jsx');
var AddOfferForm = require('./add-offer.jsx');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute url="http://localhost:3004/offers/" component={OfferListContainer} />
      <Route path="/offer-detail/:offerId" url="http://localhost:3004/offers/" component={OfferDetail} />
      <Route path="/add-offer" url="http://localhost:3004/offers/" component={AddOfferForm} />
    </Route>
  </Router>,
  document.getElementById('root')
);