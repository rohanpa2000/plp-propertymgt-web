import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

import MemberCon from '../containers/MemberCon'

import {fetchMembersFromServer } from '../actions'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',    
    color: theme.palette.text.secondary,
  },
  spacer: {
    flex: 'auto',
  },
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

const tenantId = 1;

store.dispatch(fetchMembersFromServer(tenantId));

function FullWidthGrid(props) {
  const { classes } = props;

  return (
    <Provider store={store}>
      <div style={{ padding: 20 }} className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <Paper style={{ width: 1450  }}className={classes.paper}>
                <MemberCon tenantId = {tenantId} />
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