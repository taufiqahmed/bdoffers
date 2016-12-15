var React = require('react');
var Link = require('react-router').Link;
var ajax = require('jquery').ajax;

var placeholderImage = require('../img/300.png');


// A container for all offers
var OfferListContainer = React.createClass({
  getInitialState: function(){
    return {
      data: [],
      filterBy: 'discountHightToLow',
      page: 1,
      limit: 15
    }
  },
  componentDidMount: function() {
    let pageSize;
    if (this.state.page === 1)
      pageSize = 0
    else
      pageSize = (this.state.page - 1) * this.state.limit
    console.log(pageSize);

    ajax({
      url: this.props.route.url + "skip=" +pageSize+ "limit=" +this.state.limit,
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
          <div className="col-md-7">
            <h2 style={{margin: '0', marginBottom: '20px'}}>Latest Offers</h2>
          </div>
          <div className="col-md-5">
            <div className="pull-right"><Link to="/add-offer" className="btn btn-primary">Add New Offer</Link></div>
            <form className="form-inline pull-right" style={{marginRight: '10px'}}>
              <div className="form-group">
                <label>Filter By &nbsp;</label>
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

    // var searchResult = this.props.data.filter(function(this.props.searchTerm){
      
    // }.bind(this))

    var offerNodes = sortedData.map(function(item){
      return(
        <OfferItem key={item._id} id={item._id} brand={item.brand} discount={item.discount}></OfferItem>
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