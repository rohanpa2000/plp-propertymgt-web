import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Booking from '../booking/layouts/Booking';
import User from '../user/layouts/User';
import Live from '../live/base/LiveBase';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';


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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class ButtonAppBar extends React.Component {
  state = {
    anchorEl: null,
    page: "Live"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = (open, page = 'Live') => () => {
    this.setState({
      open: open,
      page: page
    });
  };

  render() {
    const { classes } = this.props;
    const { page } = this.state;

    const sideList = (
      <div className={classes.list}>
        <List>
          {['Live', 'Bookings'].map((text, index) => (
            <ListItem button key={text}
              onClick={this.toggleDrawer(false,text)}
              onKeyDown={this.toggleDrawer(false,text)}
            >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Users', 'Members', 'Booking Item'].map((text, index) => (
            <ListItem button key={text} 
              onClick={this.toggleDrawer(false,text)}
              onKeyDown={this.toggleDrawer(false,text)}
            >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                onClick={this.toggleDrawer(true,this.state.page)}
                className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Drawer open={this.state.open} onClose={this.toggleDrawer(false, this.state.page)}>
                <div
                  tabIndex={0}
                  role="button"
                >
                  {sideList}
                </div>
              </Drawer>

              <Typography variant="title" color="inherit" className={classes.grow}>
                PLP Badminton Courts
          </Typography>
              <Button color="inherit">PLP Manager</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          {page === 'Bookings' ? (<Booking />) : ''}
          {page === 'Users' ? (<User />) : ''}
          {page === 'Live' ? (<Live />) : ''}
        </div>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
