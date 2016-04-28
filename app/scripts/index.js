import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.js';

// Polyfill for IE11
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (!target || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (!source && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// Polyfill Promise for IE11
require('es6-promise').polyfill();

// Start the app
// ReactDOM.render(<App config="config.json"/>, document.querySelector('#application'));
ReactDOM.render(<App/>, document.querySelector('#application'));