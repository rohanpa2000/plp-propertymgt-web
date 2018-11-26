import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import moment from 'moment';
import Gallery from '../components/Gallery'


const styles = theme => ({
  input: {
    color: 'black',
    '&:disabled': {
      backgroundColor: '#FF1744',
      color: 'white',
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

function makeUnsplashSrc(id, baseIncidentUrl) {
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

class InputWithIcon extends React.Component {
  constructor(props){

    super(props);
  
    const { name, isNoBooking, isPlayed, actualStartTime , actualEndTime } = this.props;

    let newActualStartTime = '';
    let newActualEndTime = '';

    if (isPlayed){
      newActualStartTime = new Date(actualStartTime.substring(0,4), actualStartTime.substring(4,6) - 1,
      actualStartTime.substring(6,8), actualStartTime.substring(8,10),
      actualStartTime.substring(10,12), actualStartTime.substring(12,14))

      newActualEndTime = new Date(actualEndTime.substring(0,4), actualEndTime.substring(4,6) - 1,
      actualEndTime.substring(6,8), actualEndTime.substring(8,10),
      actualEndTime.substring(10,12), actualEndTime.substring(12,14))
    }

    this.state = {
      stateName: name,
      wasCleared: false,
      isNoBooking: isNoBooking,

      actualStartTime: newActualStartTime,
      actualEndTime: newActualEndTime,
      isPlayed: isPlayed
    }
  }

  handleKeyPress = ch =>{
    this.setState({
      keyVal: ch.key,
    });
  }

  handleBlur = (event) =>{
    const { onDataChange} = this.props;

    onDataChange(event.target.value);
    this.setState({     
      wasZeroed: false,
    });
 };

  handleChange = event => {
    //const { wasCleared, keyVal } = this.state;
    
    //let newValue = wasCleared ? event.target.value : keyVal;
    let newValue = event.target.value;
    
    this.setState({
      stateName: newValue,
      wasCleared: true,
    });

    
  };  

  
  render() {
    const { classes, insidentImages, baseIncidentUrl, onThumbSelect, rowId, selectedThumbId, selectedThumbIndex} = this.props;
    const { stateName, isNoBooking, actualStartTime, actualEndTime, isPlayed } = this.state;


let thumbPath = '';

  if (insidentImages.length > 0) {
      thumbPath = insidentImages[0];
  }


    const caption = "player";
    const orientation = "square";

    return (
      <div>
        <Input
          className={classes.input}
          
          label={isPlayed ? (moment(actualStartTime).format('hh:mm') + " - " + moment(actualEndTime).format('hh:mm')
          ): ('')}
          style = {{width: 220}}
          disabled = {isNoBooking? true: false}
          value = {stateName}
          onChange = {this.handleChange}
          onBlur = {event => this.handleBlur(event)}
          onKeyPress={this.handleKeyPress}
          id="input-with-icon-textfield"
          InputProps={{
            className: classes.input,
            startAdornment: (
              <InputAdornment style={{ width: 25}} position="start">
                {isPlayed ? (
                                  <Gallery
                                    images={insidentImages.map((pathToImage ) => ({
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
                                    onThumbSelect = {onThumbSelect} 
                                    rowId = {rowId}
                                    baseIncidentUrl={baseIncidentUrl}
                                    selectedThumbId = {selectedThumbId}
                                    selectedThumbIndex = {selectedThumbIndex}          
                                    imgaUrl={thumbPath} /> 
                ) 
                : <AccountCircle /> }
              </InputAdornment>
            ),
        }
          
        
        }
        />
      </div>
    );
  }
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);
