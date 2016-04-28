import React from 'react';

require('!style!css!sass!../../../sass/app/components/covermessage.sass');
require('!style!css!../../../sass/app/components/loadingspinner.css');

export default class CoverMessage extends React.Component {
  render() {
    let headers, spinner;

    if (this.props.heading && this.props.subheading) {
      headers =
        <div><h1>{this.props.heading}</h1><h2>{this.props.subheading}</h2></div>
    } else {
      headers = <h1>{this.props.heading}</h1>
    }

    if (this.props.spinner === 'true') {
      spinner = <div className="loadingspinner">
        <div className="cssload-spin-box"></div>
      </div>
    }

    return (
      <div className="covermessage__cover">
        <div className="covermessage__message">
          {headers}
          {spinner}
        </div>
      </div>
    );
  }
}