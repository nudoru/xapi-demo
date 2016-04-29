/*
 Index or default app view
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RadioButton from 'material-ui/RadioButton/RadioButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialUIRHTheme from '../config/MaterialUIRHTheme';
import AppState from '../stores/AppStore';

import LRS from '../../nudoru/xapi/facade';

const muiTheme = getMuiTheme(MaterialUIRHTheme);

const styles = {
  container         : {
    paddingTop: 40,
    textAlign : 'left',
    width     : '90%',
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
    textAlign: 'center'
  },
  radioButton       : {
    marginBottom: 11
  }
};

class Default extends React.Component {
  constructor(props, context) {
    super(props, context);
    // {subjectName, subjectID, verbDisplay, objectID, objectName}
    this.state = {
      subjectName : 'Blue Berry',
      subjectID   : 'blueberry@pietown.com',
      verbDisplay : 'completed',
      objectName  : 'Filling the pies',
      objectType: 'course',
      objectID    : 'http://pietown.com/Apple_Pie_Filling_101',
      statement   : 'Click Submit to create a statement',
      isError     : false
    }
  }

  componentDidMount() {
    let state = AppState.getState();
    console.log('app state is ', state);

    LRS.connect({
      end : state.endPoint,
      user: state.userName,
      pass: state.userPass
    }).then(()=>console.log('Connected to the LRS'))
      .catch((err)=>console.warn('Failed to connect to LRS', err));

    LRS.default({
      result      : {
        completion: true,
        success   : true,
        score     : {scaled: 1}
      }, authority: {
        name: 'Irene Instructor',
        mbox: 'mailto:irene@example.com'
      }, context: {
        instructor: {
          name: 'Irene Instructor',
          mbox: 'mailto:irene@example.com'
        },
        contextActivities:{
          parent: { id: 'http://example.com/activities/pie-filling-101' },
          grouping: { id: 'http://example.com/activities/pie-town-school' }
        }
      }
    });
  }

  _handleErrorClose() {
    this.setState({isError: false});
  }

  _handleVerbChange(value) {
    this.setState({verbDisplay: value});
  }

  _handleActivityTypeChange(value) {
    this.setState({objectType: value});
  }

  _handleSubjectNameChange(event) {
    this.setState({subjectName: event.target.value});
  }

  _handleSubjectChange(event) {
    this.setState({subjectID: event.target.value});
  }

  _handleObjectNameChange(event) {
    this.setState({objectName: event.target.value});
  }

  _handleObjectChange(event) {
    this.setState({objectID: event.target.value});
  }

  _handleSubmitPress() {
    this._sendStatement.call(this);
  }

  _sendStatement() {
    // Properties on the state align to expected properties in the method
    LRS.send(this.state).then(()=>console.log('Statement sent'))
      .catch((err)=>console.warn('Failed to send', err));
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div style={styles.container}>
            <Paper zDepth={1}>
              <div style={styles.contentContainer}>
                <h5>Fill out the data below and <b>press Submit</b> to send it
                  to
                  the LRS.</h5>
                <div style={styles.formSection}>
                  <h5 style={styles.formSectionHeading}>Subject</h5>
                  <TextField
                    id="subjectName"
                    value={this.state.subjectName}
                    onChange={this._handleSubjectNameChange.bind(this)}
                    fullWidth={true}/>
                  <TextField
                    id="subjectEmail"
                    value={this.state.subjectID}
                    onChange={this._handleSubjectChange.bind(this)}
                    fullWidth={true}/>
                </div>
                <div style={styles.formSection}>
                  <h5 style={styles.formSectionHeading}>Verb</h5>
                  <AutoComplete
                    hintText="What did you do?"
                    dataSource={LRS.getVerbsList()}
                    value={this.state.verbDisplay}
                    fullWidth={true}
                    filter={AutoComplete.caseInsensitiveFilter}
                    onUpdateInput={this._handleVerbChange.bind(this)}
                    onNewRequest={this._handleVerbChange.bind(this)}
                  />
                </div>
                <div style={styles.formSection}>
                  <h5 style={styles.formSectionHeading}>Activity</h5>
                  <TextField
                    id="activityName"
                    value={this.state.objectName}
                    onChange={this._handleObjectNameChange.bind(this)}
                    fullWidth={true}/>
                  <AutoComplete
                    hintText="What type of activity"
                    dataSource={LRS.getActivitiesList()}
                    fullWidth={true}
                    filter={AutoComplete.caseInsensitiveFilter}
                    onUpdateInput={this._handleActivityTypeChange.bind(this)}
                    onNewRequest={this._handleActivityTypeChange.bind(this)}
                  />
                  <TextField
                    id="activityURL"
                    value={this.state.objectID}
                    onChange={this._handleObjectChange.bind(this)}
                    fullWidth={true}/>
                </div>
                <div style={styles.buttonArea}>
                  <RaisedButton label="Submit" primary={true}
                                onMouseUp={this._handleSubmitPress.bind(this)}
                                style={styles.buttonStyle}/>

                  <p>View the statement in the console.</p>
                </div>
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