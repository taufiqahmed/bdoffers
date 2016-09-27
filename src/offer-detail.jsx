var React = require('react');
var $ = require('jquery');

var OfferDetail = React.createClass ({
  getInitialState: function(){
    return {data: []}
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.route.url +this.props.params.offerId,
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
          <div className="col-md-4">
            <img src={this.state.data.url} className="img-thumbnail" alt="offer"/>
            <h1>{this.state.data.brand}</h1>
            <h3>{this.state.data.discount}%</h3>
            <p>{this.state.data.description}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OfferDetail;
