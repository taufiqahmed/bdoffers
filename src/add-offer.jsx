var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var AppHeader = require('./app-header.jsx');

// TO-DO
// 1. Validation
// 2. Submission Status notification
// 3. Auto Complete in Brand input
// 4. Week Month dropdown for easy date picking



var AddOfferForm = React.createClass({
  getInitialState: function () {
    return ({ 
      submitSuccess: null,
      title: "",
      brand: "",
      discount: "",
      startDate: "",
      endDate: ""
    })
  },
  _today: function () {
    var today = new Date();
    return today.toISOString().substr(0, 10);
  },
  _saveOffer: function (data) {
    $.ajax({
      url: this.props.route.url,
      contentType: 'application/json',
      dataType: 'json',
      cache: false,
      method: 'POST',
      data: JSON.stringify(data),
      success: function() {
        console.log('success');
        this.setState({submitSuccess: true});
        this._resetForm();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
        this.setState({submitSuccess: false})
      }.bind(this)
    })
  },

  // Value Reflect
  _onTitleChange: function (e){
    this.setState({title: e.target.value});
  },
  _onBrandChange: function (e){
    this.setState({brand: e.target.value});
  },
  _onDiscountChange: function (e){
    this.setState({discount: e.target.value});
  },
  _onStartChange: function (e){
    this.setState({startDate: e.target.value});
  },
  _onEndChange: function (e){
    this.setState({endDate: e.target.value});
  },
  
  // Validation
  _handleValidation: function () {
    var form = $("#offer-form");
    var titleInput = $("[name='title']", form);
    var brandInput = $("[name='brand']", form);
    var discountInput = $("[name='discount']", form);
    var startDateInput = $("[name='startDate']", form);
    var endDateInput = $("[name='endDate']", form);
    
    // Validation
    if (this.state.title == undefined || this.state.title == "") {
      $(titleInput).parent().addClass('has-error');
      $(titleInput).next().text("Offer Title shouldn't be empty");
      $(titleInput).focus();
      return
    }
    if (this.state.brand == "" || this.state.brand == undefined) {
      $(brandInput).parent().addClass('has-error');
      $(brandInput).next().text("Brand shouldnt be empty");
      $(brandInput).focus();
      return
    }
    if (this.state.discount == undefined || this.state.discount == "") {
      $(discountInput).parent().addClass('has-error');
      $(discountInput).next().text("Discount shouldn't be empty");
      $(discountInput).focus();
      return
    }
    if (this.state.startDate == undefined || this.state.startDate == "") {
      $(startDateInput).parent().addClass('has-error');
      $(startDateInput).next().text("Start Date shouldn't be empty");
      $(startDateInput).focus();
      return
    }
    if (this.state.endDate == undefined || this.state.endDate == "") {
      $(endDateInput).parent().addClass('has-error');
      $(endDateInput).next().text("End Date shouldn't be empty");
      $(endDateInput).focus();
      return
    }
  },
  
  // Handling Submit Event
  _handleSubmit: function (e) {
    e.preventDefault();
    var formData = {
      "title" : this.state.title,
      "brand" : this.state.brand,
      "discount" : this.state.discount,
      "startDate" : this.state.startDate,
      "endDate" : this.state.endDate,
    }

    this._saveOffer(formData);
    
  },
  _resetForm: function () {
    $('#offer-form')[0].reset();
  },
  render() {
    return (
      <div>
        <AppHeader></AppHeader>
        <div className="row">
          <div className="col-md-12">
            {
              (() => {
                if (this.state.submitSuccess == true){
                  return (<p className="alert alert-success">Submission Successful</p>)
                } else if (this.state.submitSuccess == false) {
                  return (<p className="alert alert-danger">Submission Failed</p>)
                } else {
                  return (<div></div>)
                }
              })()
            }
          </div>
        </div>
        <div className="row">
          <form className="col-md-6" id="offer-form" name="offer-form" onSubmit={this._handleSubmit}>
            <div className="page-header"><h2>Add New Offer</h2></div>
            <div className="form-group">
              <label htmlFor="">Offer Title</label>
              <input type="text" ref="title" name="title" className="form-control input-lg" value={this.state.title} onChange={this._onTitleChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <label htmlFor="">Brand</label>
              <input type="text" ref="brand" name="brand" className="form-control input-lg" value={this.state.brand} onChange={this._onBrandChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <label htmlFor="">Discount</label>
              <input type="number" min="5" max="100" ref="discount" name="discount" className="form-control input-lg" value={this.state.discount} onChange={this._onDiscountChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <label htmlFor="">Start Time</label>
              <input type="date" ref="startDate" name="startdate" className="form-control input-lg" value={this.state.startDate} onChange={this._onStartChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <label htmlFor="">End Time</label>
              <input type="date" ref="endDate" name="enddate" className="form-control input-lg" value={this.state.endDate} onChange={this._onEndChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <button className="btn btn-success btn-lg" type="submit">Submit</button>
              &nbsp;
              <Link className="btn btn-default btn-lg" to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>

    );
  }
});

module.exports = AddOfferForm;

