/*
Just for reference 
 */

import React from 'react';

import history from '../config/history'

require('!style!css!sass!../../../sass/nudoru/layout/_header.sass');

// Handler for button click
const onButtonPress = (e) => {
  history.push(e.target.textContent.toLowerCase());
};

// Button component
const NavButton = ({label}) => <button onClick={onButtonPress}>{label}</button>;

// Header bar
export default class AppHeader extends React.Component {
  render() {
    return (
      <header className='app__header'>
        <h1>{this.props.title}</h1>
        <nav className='app__header-nav'>
          {this.props.navigation.map((c, i) => <NavButton key={i}
                                                                label={c}/>)}
        </nav>
      </header>
    );
  }
}

AppHeader.propTypes = {
  title     : React.PropTypes.string,
  navigation: React.PropTypes.array
};