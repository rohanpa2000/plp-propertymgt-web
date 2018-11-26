import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 10,
    border: 0,
    width: '30%',
    textAlign: 'center',
    color: 'white',
    height: '20px',
    padding: '20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

function Total(props) {
  const { classes } = props;

  return (
      <Typography variant="h1"  className={classes.root}> Total for the day: Rs. 2,500 </Typography>     
  );
}

Total.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Total);
