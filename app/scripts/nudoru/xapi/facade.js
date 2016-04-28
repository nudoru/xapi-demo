/**
 * Simple facade around the TinCan class to make sending statements easier
 *
 * Full doc https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#result
 * TinCan Module docs http://rusticisoftware.github.io/TinCanJS/
 * Statements https://tincanapi.com/statements-101/
 */

import TinCan from 'tincanjs';
import VerbDictionary from './ADL-Verbs';
import {defaults, assign} from 'lodash';

let LRS,
    defaultProps    = {},
    verbURLPrefix   = 'http://adlnet.gov/expapi/verbs/',
    defaultLanguage = 'en-US';

export default {

  // Connect to the LRS
  connect(initObject) {
    let {end, user, pass} = initObject;
    return new Promise(function (resolve, reject) {
      try {
        LRS = new TinCan.LRS({
          endpoint : end,
          username : user,
          password : pass,
          allowFail: false
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  },

  // Set defaults to be allied to each statement
  // Example:
  // result      : {
  //   completion: true,
  //   success   : true,
  //   score     : {scaled: 1}
  // }, authority: {
  //   name: "Irene Instructor",
  //   mbox: "mailto:irene@example.com"
  // }
  default(defaultObj) {
    defaultProps = assign({}, defaultObj);
  },

  // Returns array of verbs from the ADL list
  getVerbsList() {
    return Object.keys(VerbDictionary).map((key) => VerbDictionary[key].display[defaultLanguage]);
  },

  // True if the verb is on the ADL list
  validateVerb(verb) {
    return this.getVerbsList().indexOf(verb.toLowerCase()) >= 0;
  },

  // Create an xAPI statement object
  createStatement(statementData) {
    let statement,
        {subjectName, subjectID, verbDisplay, objectID, objectName} = statementData;



    if (!this.validateVerb(verbDisplay)) {
      console.warn('LRS verb is not in the dictionary', verbDisplay);
    }

    /*
     "timestamp": "2012-07-05T18:30:32.360Z",
     "stored": "2012-07-05T18:30:33.540Z",
     */
    // TODO use defaultLanguage
    statement = defaults({
      actor : {
        name: subjectName,
        mbox: 'mailto:' + subjectID
      },
      verb  : {
        id     : verbURLPrefix + verbDisplay.toLowerCase(),
        display: {'en-US': verbDisplay.toLowerCase()}
      },
      object: {
        id        : objectID,
        definition: {
          name       : {'en-US': objectName}
        }
      }
    }, defaultProps);

    return new TinCan.Statement(statement);
  },

  // Create and send an xAPI statement
  send(statementData) {
    let statement = this.createStatement(statementData);
    console.log(statement);

    return new Promise(function (resolve, reject) {

      if (!LRS) {
        reject({message: 'LRS not connected! Cannot send statement: ' + statement});
        return;
      }

      LRS.saveStatement(statement, {
        callback: (err, xhr) => {
          if (err !== null) {
            if (xhr !== null) {
              reject({status: xhr.status, message: xhr.responseText});
              return;
            }
            reject({message: err});
            return;
          }
          resolve();
        }
      });
    });
  }

}