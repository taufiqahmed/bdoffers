var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var placeholderImage = require('../img/300.png');


// A container for all offers
var OfferListContainer = React.createClass({
  getInitialState: function(){
    return {
      data: [],
      filterBy: 'discountHightToLow'
    }
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
        console.error(status, err.toString());
      }
    });
  },
  _onFilterChange: function (params) {
    var filterValue = document.getElementById("filter").value;
    this.setState({filterBy: filterValue})
    console.log(this.state);
  },
  render: function(){
    return (
      <div className="offer-box">
        <div className="row">
          <div className="col-md-8">
            <h1>Latest Offers</h1>
          </div>
          <div className="col-md-4">
            <div className="pull-right"><Link to="/add-offer" className="btn btn-primary btn-lg">Add Offer</Link></div>
            <form className="form-inline">
              <div className="form-group">
                <label>Filter By </label>
                <select className="form-control" id="filter" onChange={this._onFilterChange}>
                  <option value="discountHightToLow">Discount Hight to Low</option>
                  <option value="discountLowToHigh">Discount Low to High</option>
                  <option value="sortByBrandAZ">Sort By Brand Name</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <OfferList data={this.state.data} filterBy={this.state.filterBy}/>
        </div>
      </div>
    );
  }
});

// List of Offers
var OfferList = React.createClass({
  render: function(){
    
    var sortedData = this.props.data.sort(function (a, b) {
      if (this.props.filterBy === 'discountHightToLow'){
        if (a.discount > b.discount) {
          return -1;
        }
        if (a.discount < b.discount) {
          return 1;
        }
      } else if (this.props.filterBy === 'discountLowToHigh'){
        if (a.discount > b.discount) {
          return 1;
        }
        if (a.discount < b.discount) {
          return -1;
        }
      } else if (this.props.filterBy === 'sortByBrandAZ'){
        if (a.brand > b.brand) {
          return 1;
        }
        if (a.brand < b.brand) {
          return -1;
        }
      } else {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
      }
      return 0
    }.bind(this));

    var offerNodes = sortedData.map(function(item){
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
          <img src={placeholderImage} alt="Offer"/>
          <div className="caption">
            <h2>{this.props.discount}%</h2>
            <h4 className="text-danger">{this.props.brand}</h4>
            <p><Link to={"offer-detail/" + this.props.id} className="btn btn-success" role="button">View Offer</Link> </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OfferListContainer;