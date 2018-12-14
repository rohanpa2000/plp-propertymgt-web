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

const tenantId = 1;

function createItem(id,tenantid,instanceName,displayName,localUrl,webUrl,mobileUrl, displayNameShort) {

  const min = 1;
  const max = 1000;
  const key = min + Math.random() * (max - min);

return { key, id,tenantid,instanceName,displayName,localUrl,webUrl,mobileUrl, displayNameShort};
}

const addItem = (itemData, id,tenantid,instanceName,displayName,localUrl,webUrl,mobileUrl, displayNameShort) => {
  //const { tenantid } = props;

  const newItem = createItem(id,tenantid,instanceName,displayName,localUrl,webUrl,mobileUrl, displayNameShort);

  const updatedData = [
    ...itemData,
    newItem
  ];

  return updatedData;
};

function FullWidthGrid(props) {
  const { classes } = props;

  let itemData = [];

itemData = addItem( itemData, 3,1,
                      'court1', 
                      'Court One [1]',
                      'http://192.168.1.35/capture/',
                      'http://jaela.dvrdns.org:3580/capture/',
                      'http://jaela.dvrdns.org:3580/capture/', 
                      '[1]');
                      
itemData = addItem( itemData, 4,1,
                        'court2', 
                        'Court Two [2]',
                        'http://192.168.1.36/capture/',
                        'http://jaela.dvrdns.org:3680/capture/',
                        'http://jaela.dvrdns.org:3680/capture/', 
                        '[2]');

function getBookingList(tenantId, baseIncidentUrl, item) {
  return (
    <BookingList
      itemId = {item.id}
      tenantId = {tenantId}
      baseIncidentUrl = {baseIncidentUrl}
      courtname = {item.instanceName}
      displayName = {item.displayName} />
  );
}

  return (
    <Provider store={store}>
      <div style={{ padding: 0 }} className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} >
            <Paper elevation={0} square={true} className={classes.paper}><Total /></Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0} square={true} className={classes.paper}><DateFilter tenantId = {tenantId}/></Paper>
          </Grid>
          
          {itemData.map(item => (
            <Grid item xs={12} sm={6} key = {item.key}>
            <Paper className={classes.paper}>
              <Router>
                <Switch>
                  <Route exact path="/" component={() => getBookingList(tenantId, item.localUrl, item)} />
                  <Route exact path="/web" component={() => getBookingList(tenantId, item.webUrl, item)} />
                  <Route exact path="/mobile" component={() => getBookingList(tenantId, item.mobileUrl, item)} />
                </Switch>
              </Router>
              </Paper>
          </Grid>
          ))}
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
