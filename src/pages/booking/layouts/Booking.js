import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
//import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

//import { fetchBookingsFromServer, fetchLastIncidentsFromServer } from '../actions'

import Total from '../containers/TotalCost'
import DateFilter from '../containers/DateFilter'
import BookingList from '../containers/BookingList'

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

//const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

//console.log("getting booking from server " + store.getState().filterDate);

//store.dispatch(fetchBookingsFromServer(store.getState().filterDate));
//store.dispatch(fetchLastIncidentsFromServer());



function getLocalBookingListCourt1() {
  return (
    <BookingList
      baseIncidentUrl='http://192.168.1.35/capture/'
      courtname='court1'
      displayName='Court One [ 1 ]' />
  );
}

function getWebBookingListCourt1() {
  return (
    <BookingList
      baseIncidentUrl='http://jaela.dvrdns.org:3580/capture/'
      courtname='court1'
      displayName='Court One [ 1 ]' />
  );
}

function getMobileBookingListCourt1() {
  return (
    <BookingList
      baseIncidentUrl='http://jaela.dvrdns.org:3580/capture/'
      courtname='court1'
      displayName='[ 1 ]' />
  );
}

//888888888888888888888888888888888888888888

function getLocalBookingListCourt2() {
  return (
    <BookingList
      baseIncidentUrl='http://192.168.1.36/capture/'
      courtname='court2'
      displayName='Court One[ 2 ]' />
  );
}

function getWebBookingListCourt2() {
  return (
    <BookingList
      baseIncidentUrl='http://jaela.dvrdns.org:3680/capture/'
      courtname='court2'
      displayName='Court One [ 2 ]' />
  );
}

function getMobileBookingListCourt2() {
  return (
    <BookingList
      baseIncidentUrl='http://jaela.dvrdns.org:3680/capture/'
      courtname='court2'
      displayName='[ 2 ]' />
  );
}


function FullWidthGrid(props) {
  const { classes } = props;

  return (
    <Provider store={store}>
      <div style={{ padding: 0 }} className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} >
            <Paper elevation={0} square={true} className={classes.paper}><Total /></Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} square={true} className={classes.paper}><DateFilter /></Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <Router>
                <Switch>
                  <Route exact path="/" component={() => getLocalBookingListCourt1()} />
                  <Route exact path="/web" component={() => getWebBookingListCourt1()} />
                  <Route path="/mobile" component={() => getMobileBookingListCourt1()} />
                </Switch>

              </Router>
              </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            <Router>
            <Switch>
                  <Route exact path="/" component={() => getLocalBookingListCourt2()} />
                  <Route exact path="/web" component={() => getWebBookingListCourt2()} />
                  <Route path="/mobile" component={() => getMobileBookingListCourt2()} />
                </Switch>

              </Router>
 
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
//export default connect()(FullWidthGrid);
