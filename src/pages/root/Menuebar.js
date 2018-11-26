import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Booking from '../booking/layouts/Booking';
import User from '../user/layouts/User';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component{
  state = {
    anchorEl: null,
    page: "user"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleBookingSelect = () => {
    this.setState({ 
      anchorEl: null,
      page: "booking"
     });
  };

  handleUserSelect = () => {
    this.setState({ 
      anchorEl: null,
      page: "user"
     });
  };

  render () {
  const { classes } = this.props;
  const { anchorEl, page } = this.state;
  return (
    <div className={classes.root}>
      <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                      className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleBookingSelect}>Bookings</MenuItem>
          <MenuItem onClick={this.handleUserSelect}>Users</MenuItem>
          <MenuItem onClick={this.handleClose}>Members</MenuItem>
          <MenuItem onClick={this.handleClose}>Booking items</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
          <Typography variant="title" color="inherit" className={classes.grow}>
            PLP Badminton Courts
          </Typography>
          <Button color="inherit">PLP Manager</Button>
        </Toolbar>
      </AppBar>
      </div>
      <div>
        {page === 'booking' ? (<Booking />) : ''}
        {page === 'user' ? (<User />) : ''}
      </div>
    </div>
  );
}
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
