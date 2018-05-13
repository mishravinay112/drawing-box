import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
}

class Header extends Component {
  static propTypes = {
  }

  render() {
    return (<div className="container text-center Header">
      <h1>HEADER</h1>
    </div>);
  }
}

export default Header;
