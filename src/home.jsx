var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');


// A container for all offers
var OfferBox = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.route.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    return (
      <div className="offer-box">
        <div className="row">
          <div className="col-md-8">
            <h1>Latest Offers</h1>
          </div>
          <div className="col-md-4">
            <h1 className="text-right"><Link to="/add-offer" className="btn btn-primary btn-lg">Add Offer</Link></h1>
          </div>
        </div>
        <div className="row">
          <OfferList data={this.state.data} />
        </div>
      </div>
    );
  }
});

// List of Offers
var OfferList = React.createClass({
  render: function(){
    var offerNodes = this.props.data.map(function(item){
      return(
        <OfferItem key={item.id} id={item.id} brand={item.brand} discount={item.discount}></OfferItem>
      );
  });
  return (
    <div className="offer-list">
      {offerNodes}
    </div>
  );
}
});

// AN individual offer tiem
var OfferItem = React.createClass({
  render: function(){
    return (
      <div className="offer col-md-3">
        <div className="thumbnail">
          <img src="./img/300.png" />
          <div className="caption">
            <h2>{this.props.discount}%</h2>
            <h4 className="text-danger">{this.props.brand}</h4>
            <p><Link to={"/offer-detail/" + this.props.id} className="btn btn-success" role="button">View Offer</Link> </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OfferBox;