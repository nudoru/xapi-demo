/**
 * Application container
 * Loads configuration data and displays the final application
 * An external JSON file is used to provide set up data to the app outside of
 * the bundle file. Allows for configuration post build
 */

import React from 'react';
import AppStore from './stores/AppStore';
import Actions from './actions/actionCreators.js';
import CoverMessage from './components/CoverMessage.js';
import Default from './components/Default';
import JSONLoader from '../nori/service/JSONLoader.js';

// Global App Styles
require('!style!css!../../css/vendor/normalize.css');
require('!style!css!../../css/fonts.css');
require('!style!css!sass!../../sass/app/app.sass');

export default class AppContainer extends React.Component {

  constructor() {
    super();
    // Loading the config data with no errors to start
    this.state = {loading: true, isError: false};
  }

  componentDidMount() {
    let {config} = this.props;

    if (!config) {
      // No config
      AppStore.dispatch(Actions.setConfig(null));
      this.setState({loading: false});
    } else {
      // Load config data
      JSONLoader.onSuccess((data) => {
        AppStore.dispatch(Actions.setConfig(data));
        this.setState({loading: false})
      });
      JSONLoader.onError(() => this.setState({loading: false, isError: true}));
      JSONLoader.load(config);
    }
  }

  // Render the application view depending on loading/error or data loaded
  render() {
    // If we're in a loading or error state ...
    if (this.state.loading) {
      return <CoverMessage heading='Please Wait' spinner='true'/>;
    } else if (this.state.isError) {
      return <CoverMessage heading='Problem loading application'/>;
    }

    // Return the default view
    return <section id="contents">
      <Default />
    </section>;
  }

}