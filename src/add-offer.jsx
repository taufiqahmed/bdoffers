var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

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
  
  // Posting Data to API
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

  // Binding input value to State
  _onInputChange: function(e){
    var input = e.target;
    switch (input.name) {
      case 'title':
        this.setState({title: input.value});
        break
      case 'brand':
        this.setState({brand: input.value});
        break
      case 'discount':
        this.setState({discount: input.value});
        break
      case 'startdate':
        this.setState({startDate: input.value});
        break
      case 'enddate':
        this.setState({endDate: input.value});
        break
      default:
        console.log('No name matched');
    }
    
    this._checkValidity(input);
  },
  
  // check validity on change and tab change
  _checkValidity: function(input){
    if (!input.value) {
      $(input).closest('.form-group').addClass('has-error');
      $(input).next('.help-block').text(input.name+ " shouldn't be empty");
      $(input).focus();
      return
    } else {
      $(input).closest('.form-group').removeClass('has-error');
      $(input).next('.help-block').text("");
    }
  },
  
  // Validation
  _handleValidation: function () {
    // return HtmlCollection
    var offerFormInput = document.offerForm.getElementsByTagName('input');
    // Converting Collection to Array
    var offerFormInputArray = [].slice.call(offerFormInput);
    
    offerFormInputArray.forEach(function(input, index){
      this._checkValidity(input);
    }, this);
    
    // Does every input element has value?
    var formValid = offerFormInputArray.every(function (input) {
      return input.value;
    });

    if (formValid){
      // var formData = {
      // "title" : this.state.title,
      // "brand" : this.state.brand,
      // "discount" : this.state.discount,
      // "startDate" : this.state.startDate,
      // "endDate" : this.state.endDate,
      // }

      this.setState({submitSuccess: true});
      // this._saveOffer(formData);
    }
  },
  
  // Handling Submit Event
  _handleSubmit: function (e) {
    e.preventDefault();
    this._handleValidation();
  },

  _dismissAlert: function (e) {
    $(e.target).parent(".alert").fadeOut("medium");
  },
  
  _resetForm: function () {
    $('#offer-form')[0].reset();
  },
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {
              (() => {
                if (this.state.submitSuccess){
                  return (
                    <div className="alert alert-success alert-dismissible" role="alert">
                      <button type="button" className="close" onClick={this._dismissAlert}>&times;</button>
                      Offer Submitted Successfully.
                    </div>
                  )
                } else if (this.state.submitSuccess === false) {
                  return (<p className="alert alert-danger" onClick={this._dismissAlert}>Submission Failed. Please Try Again.</p>)
                } else {
                  return (<div></div>)
                }
              })()
            }
          </div>
        </div>
        <div className="row">
          <form className="col-md-6 col-md-offset-3" id="offer-form" name="offerForm" onSubmit={this._handleSubmit}>
            <div className="page-header"><h2>Add New Offer</h2></div>
            <div className="form-group">
              <label htmlFor="">Offer Title</label>
              <input type="text" name="title" tabIndex="1" className="form-control input-lg" value={this.state.title} onChange={this._onInputChange} onBlur={this._onInputChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <label htmlFor="">Brand</label>
              <input type="text"name="brand" tabIndex="2" className="form-control input-lg" value={this.state.brand} onChange={this._onInputChange} onBlur={this._onInputChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <label htmlFor="">Discount</label>
              <input type="number" min="5" max="100" tabIndex="3" name="discount" className="form-control input-lg" value={this.state.discount} onChange={this._onInputChange} onBlur={this._onInputChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <label htmlFor="">Start Time</label>
              <input type="date" tabIndex="4" name="startdate" className="form-control input-lg" value={this.state.startDate} onChange={this._onInputChange} onBlur={this._onInputChange}/>
              <span className="help-block"></span>
            </div>
            <div className="form-group">
              <label htmlFor="">End Time</label>
              <input type="date" tabIndex="5" name="enddate" className="form-control input-lg" value={this.state.endDate} onChange={this._onInputChange} onBlur={this._onInputChange}/>
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

