import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Button from '@material-ui/core/Button';

import Gallery from '../components/Gallery'



const styles = theme => ({

  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto',
  },
  root: {
    width: '100%',
    marginTop: 0,
  },
  table: {
    minWidth: 5,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  button_active: {
    margin: theme.spacing.unit,
    '&:disabled': {
      backgroundColor: '#C2185B',
      color: 'white'
    },
  },
  button_inactive: {
    margin: theme.spacing.unit,
    '&:disabled': {
      backgroundColor: '#00796B',
      color: 'white'
    },
  },
});

function makeUnsplashSrc(id, baseIncidentUrl) {
  //console.log(baseIncidentUrl + id);
  return baseIncidentUrl + id;
}
function makeUnsplashSrcSet(id, size, baseIncidentUrl) {
  return baseIncidentUrl + id + ' ' + size + 'w';
}
function makeUnsplashThumbnail(id, orientation = 'landscape', baseIncidentUrl) {
  /*const dimensions = orientation === 'square'
      ? 'w=400&h=400'
      : 'w=240&h=159';*/

  return baseIncidentUrl + id;
}


class EnhancedTable extends React.Component {

  componentDidMount = () => {

    const { fetchLastIcidents, totalIncidents, triggerTime } = this.props;

    if (triggerTime) {

      var intervalId = setInterval(this.timer, 30000);
      this.setState({ intervalId: intervalId });

      fetchLastIcidents(totalIncidents);
    }
  }

  componentWillUnmount = () => {
    const {triggerTime } = this.props;

    if (triggerTime) {
        clearInterval(this.state.intervalId);
    }
  }

  timer = () => {
    const { fetchLastIcidents, totalIncidents } = this.props;
    fetchLastIcidents(totalIncidents);
  }

  render() {
    const { classes, tableTile } = this.props;
    const { lastIncidentTime, isActive, baseIncidentUrl, lastIncidents } = this.props;

    let thumbPath = '';

    if (lastIncidents.length > 0) {
      thumbPath = lastIncidents[0].pathToImage;
    }

    const caption = "player";
    const orientation = "square";

    //const { selectedThumbId, selectedThumbIndex } = this.state;


    return (
      <div>
        <Paper className={classes.paper}>
          <div style={{ display: 'inline-block' }}>
            <Typography variant="title" id="tableTitle">
              {tableTile}
            </Typography>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div style={{ display: 'inline-block' }}>


            {isActive ? (
              <Button style={{ width: 100 }} disabled={true} variant="contained" color="primary" className={classes.button_active}>
                {moment(lastIncidentTime).format('hh:mm A')}
              </Button>
            ) : (
                <Button style={{ width: 100 }} disabled={true} variant="contained" color="primary" className={classes.button_inactive}>
                  {moment(lastIncidentTime).format('hh:mm A')}
                </Button>
              )}

          </div>


        </Paper>
        <Paper className={classes.paper} elevation={1}>
          <div style={{ display: 'inline-block' }}>

            <Gallery images={lastIncidents.map(({ pathToImage }) => ({
              src: makeUnsplashSrc(pathToImage, baseIncidentUrl),
              thumbnail: makeUnsplashThumbnail(pathToImage, orientation, baseIncidentUrl),
              srcSet: [
                makeUnsplashSrcSet(pathToImage, 1024, baseIncidentUrl),
                makeUnsplashSrcSet(pathToImage, 800, baseIncidentUrl),
                makeUnsplashSrcSet(pathToImage, 500, baseIncidentUrl),
                makeUnsplashSrcSet(pathToImage, 320, baseIncidentUrl),
              ],
              caption,
              orientation,

            }))} showThumbnails={true}
              baseIncidentUrl={baseIncidentUrl}
              imgaUrl={thumbPath} />
          </div>

        </Paper>
      </div>

    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
