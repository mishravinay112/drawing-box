import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'react-helmet';

import meta from '../util/meta/home-page';

import Header from '../components/Header';

export class Home extends Component {
  static propTypes = {

  }

  static getMeta() {
    return meta;
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const head = Home.getMeta();

    return (
      <div className="container text-center">
        <Meta title={head.title} description={head.description} link={head.link} meta={head.meta} />
        <Header />
      </div>
    );
  }
}

export default connect(state => ({
}), null)(Home);
