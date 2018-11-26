import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'


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
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

function FullWidthGrid(props) {
  const { classes } = props;

  return (
    <Provider store={store}>
      <div style={{ padding: 0 }} className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              Page 1
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
