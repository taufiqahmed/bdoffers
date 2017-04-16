var React = require('react');
var Link = require('react-router').Link;
var ajax = require('jquery').ajax;

var placeholderImage = require('../img/300.png');

var BrandPage = React.createClass({
  getInitialState: function () {
    return {
      offerList: [],
      brandInfo: {}
    }
  },
  componentDidMount: function () {
    ajax({
      url: this.props.route.url + "brand="+ this.props.params.brandId,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ offerList: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  },
  render: function () {
    return (
      <div id="brand-page-component">
        <BrandInfo brandId={this.props.params.brandId} data={this.state.brandInfo}></BrandInfo>
        <OfferList data={this.state.offerList}></OfferList>
      </div>
    )
  }
});

// Brand  Information
var BrandInfo = React.createClass({
  render: function (){
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="logo">
            <img src={placeholderImage} alt="Logo"/>
          </div>
        </div>
        <div className="col-md-8">
          <h1>{this.props.data.name}</h1>
          <p>Contact: {this.props.data.phoneNumberList}</p>
          <p>
  <a href={this.props.data.facebookUrl}>Facebook</a> &nbsp;
            <a href={this.props.data.instagramUrl}>Instagram</a> 
          </p>
          <p><a onClick={this.showBranchModal}>Branch List</a></p>
        </div>
      </div>
    )
  }
})

// List of Offers
var OfferList = React.createClass({
  render: function(){
    var offerNodes = this.props.data.map(function(item){
      return(
        <OfferItem key={item._id} id={item._id} brand={item.brand} discount={item.discount}></OfferItem>
      );
    });
    return (
      <div className="offer-list row">
        <div className="col-md-12">
          <h3>Latest Offers</h3>
        </div>
        {offerNodes}
      </div>
    );
  }
});

// AN individual offer tiem
var OfferItem = React.createClass({
  render: function(){
    return (
      <div className="offer col-xs-4 col-md-3">
        <div className="thumbnail">
          <img src={placeholderImage} alt="Offer"/>
          <div className="caption">
            <h2>{this.props.discount}%</h2>
            <p><Link to={"offer-detail/" + this.props.id} className="btn btn-success" role="button">View Offer</Link></p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BrandPage;