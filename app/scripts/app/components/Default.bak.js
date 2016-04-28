/*
 Index or default app view
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialUIRHTheme from '../config/MaterialUIRHTheme';
import AppState from '../stores/AppStore';

//http://rusticisoftware.github.io/TinCanJS/
import TinCan from 'tincanjs';

const muiTheme = getMuiTheme(MaterialUIRHTheme);

const styles = {
  container         : {
    paddingTop: 40,
    textAlign : 'left',
    width     : '75%',
    margin    : '0 auto'
  },
  contentContainer  : {
    padding: 22
  },
  formSection       : {
    marginTop   : 11,
    marginBottom: 22
  },
  formSectionHeading: {
    color: 'rgb(22, 185, 225)'
  },
  buttonStyle       : {
    margin: 0
  },
  buttonArea        : {
    marginTop: 22,
    textAlign: 'right'
  },
  radioButton       : {
    marginBottom: 11
  }
};

class Default extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lrs      : {},
      subject  : 'blueberry@pietown.com',
      verb     : 'Completed',
      object   : 'http://pietown.com/Apple_Pie_Filling_101',
      statement: 'Click Submit to create a statement',
      isError  : false
    }
  }

  componentDidMount() {
    let state = AppState.getState(), lrs;
    console.log('app state is ', state);
    try {
      lrs = new TinCan.LRS({
        endpoint : state.endPoint,
        username : state.userName,
        password : state.userPass,
        allowFail: false
      });
      console.log('LRS Connected');
      this.setState({lrs: lrs, isError: false});
    } catch (ex) {
      console.warn("Failed to setup LRS object: " + ex);
      this.setState({isError: true});
    }
  }

  _handleErrorClose() {
    this.setState({isError: false});
  }

  _handleVerbChange(event) {
    this.setState({verb: event.target.value});
  }

  _handleSubjectChange(event) {
    this.setState({subject: event.target.value});
  }

  _handleObjectChange(event) {
    this.setState({object: event.target.value});
  }

  _handleSubmitPress() {
    console.log('SUBMIT!', this.state);
    this._sendStatement.call(this);
  }

  // https://tincanapi.com/statements-101/
  _sendStatement() {
    let statement, statementObj;

    statementObj = {
      actor    : {
        name: this.state.subject,
        mbox: 'mailto:' + this.state.subject
      },
      verb     : {
        id     : 'http://adlnet.gov/expapi/verbs/' + this.state.verb.toLowerCase(),
        display: {'en-US': this.state.verb.toLowerCase()}
      },
      object   : {
        id        : this.state.object,
        definition: {
          name       : {'en-US': this.state.object},
          description: {'en-US': 'Testing xAPI calls...'}
        }
      },
      result   : {
        completion: true,
        success   : true,
        score     : {scaled: 1}
      },
      authority: {
        name: "Irene Instructor",
        mbox: "mailto:irene@example.com"
      }
    };

    /*
     "timestamp": "2012-07-05T18:30:32.360Z",
     "stored": "2012-07-05T18:30:33.540Z",
     */

    statement = new TinCan.Statement(statementObj);
    this.setState({statement: JSON.stringify(statement)});

    this.state.lrs.saveStatement(statement, {
      callback: (err, xhr) => {
        if (err !== null) {
          if (xhr !== null) {
            console.warn("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
            return;
          }
          console.warn("Failed to save statement: " + err);
          return;
        }
        console.log("Statement saved");
      }
    });

    console.log('sent!');
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div style={styles.container}>
            <Paper zDepth={5}>
              <div style={styles.contentContainer}>
                <h3>RHU xAPI Testing</h3>
                <p>Fill out the data below and <b>press Submit</b> to send it to
                  the LRS.</p>
                <div style={styles.formSection}>
                  <h5 style={styles.formSectionHeading}>Email address
                    (subject)</h5>
                  <TextField
                    id="subjectEmail"
                    value={this.state.subject}
                    onChange={this._handleSubjectChange.bind(this)}
                    fullWidth={true}/>
                </div>
                <div style={styles.formSection}>
                  <h5 style={styles.formSectionHeading}>What did you do?
                    (verb)</h5>
                  <RadioButtonGroup name="verb"
                                    defaultSelected={this.state.verb}
                                    onChange={this._handleVerbChange.bind(this)}>
                    <RadioButton
                      value="Completed"
                      label="Completed"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="Experienced"
                      label="Experienced"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="Passed"
                      label="Passed"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>

                </div>
                <div style={styles.formSection}>
                  <h5 style={styles.formSectionHeading}>Activity URL
                    (object)</h5>
                  <TextField
                    id="activityURL"
                    value={this.state.object}
                    onChange={this._handleObjectChange.bind(this)}
                    fullWidth={true}/>
                </div>
                <div style={styles.buttonArea}>
                  <RaisedButton label="Submit" primary={true}
                                onMouseUp={this._handleSubmitPress.bind(this)}
                                style={styles.buttonStyle}/>
                </div>
                <h6>Sent Statment</h6>
                <TextField
                  id="statementpreview"
                  value={this.state.statement}
                  multiLine={true}
                  rows={20}
                  fullWidth={true}
                />
              </div>

            </Paper>
          </div>
          <Dialog
            title="Error Connecting to the LRS"
            modal={true}
            open={this.state.isError}
            onRequestClose={this._handleErrorClose}>
            There was an error connecting to the LRS, please try again.
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Default;