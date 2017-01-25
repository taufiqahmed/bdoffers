var React = require('react');
var Link = require('react-router').Link;
var ajax = require('jquery').ajax;
var placeholderImage = require('../img/300.png');

var SearchResults = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  componentDidMount: function() {
    ajax({
      url: this.props.route.url + "search=" +this.props.params.query,
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
  
  render: function(){
    var offerNodes = this.state.data.map(function(item){
      return(
        <OfferItem key={item._id} id={item._id} brand={item.brand} discount={item.discount}></OfferItem>
      );
    });

    return (
      <div className="row">
        {offerNodes}
      </div>
    )
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
            <h4 className="text-primary">{this.props.brand}</h4>
            <p><Link to={"offer-detail/" + this.props.id} className="btn btn-success" role="button">View Offer</Link> </p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchResults;