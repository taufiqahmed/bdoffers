var React = require('react');
var Link = require('react-router').Link;

var AppHeader = React.createClass ({
  render: function () {
    return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                BDoffers
              </Link>
              <form className="navbar-form navbar-left" role="search">
                <div className="input-group">
                  <input type="text" className="form-control" id="exampleInputAmount" placeholder="Search Offers..."/>
                  <div className="input-group-btn">
                    <button className="btn btn-default">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </header>
    )
  }
});

module.exports = AppHeader;