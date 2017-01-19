var React = require('react');
var ajax = require('jquery').ajax;

var placeholderImage = require('../img/300.png');

var OfferDetail = React.createClass ({
  getInitialState: function(){
    return {data: []}
  },
  componentDidMount: function() {
    ajax({
      url: this.props.route.url + "id=" +this.props.params.offerId,
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
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center">
            <img src={placeholderImage} className="img-thumbnail" alt="offer"/>
            <h1>{this.state.data.discount}%</h1>
            <h2>{this.state.data.brand}</h2>
            <h3>{this.state.data.title}</h3>
            <p>{this.state.data.description}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OfferDetail;
