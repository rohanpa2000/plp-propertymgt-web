import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import LiveCon from '../containers/LiveCon'

import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import LiveReducers from '../reducers'

import Clock from 'react-live-clock';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  spacer: {
    flex: 'auto',
  },
});

const store = createStore(
  LiveReducers,
  applyMiddleware(thunkMiddleware)
)

//888888888888888888888888888888888888888888

function getLocalforCourt1() {
  return (
    <LiveCon
      baseIncidentUrl='http://192.168.1.35/capture/'
      courtname='court1'
      displayName='Court One [ 1 ]'
      triggerTime= {false} />
  );
}

function getWebforCourt1() {
  return (
    <LiveCon
      baseIncidentUrl='http://jaela.dvrdns.org:3580/capture/'
      courtname='court1'
      displayName='Court One [ 1 ]' 
      triggerTime= {false} />
  );
}

function getMobileforCourt1() {
  return (
    <LiveCon
      baseIncidentUrl='http://jaela.dvrdns.org:3580/capture/'
      courtname='court1'
      displayName='[ 1 ]'
      triggerTime= {false} />
  );
}

//888888888888888888888888888888888888888888

function getLocalforCourt2() {
  return (
    <LiveCon
      baseIncidentUrl='http://192.168.1.36/capture/'
      courtname='court2'
      displayName='Court Two[ 2 ]' 
      triggerTime= {true}/>
  );
}

function getWebforCourt2() {
  return (
    <LiveCon
      baseIncidentUrl='http://jaela.dvrdns.org:3680/capture/'
      courtname='court2'
      displayName='Court Two [ 2 ]'
      triggerTime= {true} />
  );
}

function getMobileforCourt2() {
  return (
    <LiveCon
      baseIncidentUrl='http://jaela.dvrdns.org:3680/capture/'
      courtname='court2'
      displayName='[ 2 ]'
      triggerTime= {true} />
  );
}

function FullWidthGrid(props) {
  const { classes } = props;

  return (
    <Provider store={store}>
      <div style={{ padding: 0 }} className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Router>
                <Switch>
                  <Route exact path="/" component={() => getLocalforCourt1()} />
                  <Route exact path="/web" component={() => getWebforCourt1()} />
                  <Route path="/mobile" component={() => getMobileforCourt1()} />
                </Switch>
              </Router>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Router>
                <Switch>
                  <Route exact path="/" component={() => getLocalforCourt2()} />
                  <Route exact path="/web" component={() => getWebforCourt2()} />
                  <Route path="/mobile" component={() => getMobileforCourt2()} />
                </Switch>
              </Router>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              This page is live when there is action at the loction. It is not a live stream.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Local time:  <Clock format={'hh:mm:ss A'} ticking={true} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Provider>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);