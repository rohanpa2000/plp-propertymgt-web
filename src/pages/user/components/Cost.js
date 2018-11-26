/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});


function NumberFormatCustom(props) {
  const {inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="Rs."
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

class FormattedInputs extends React.Component {
  constructor(props){
    super(props)
    const { cost, isNoBooking } = this.props;
    this.state = {
      stateCost: cost === 0 ? '': cost,
      wasZeroed: false,
      isNoBooking : isNoBooking
    };
  }
  

  handleChange = event => {
    const { wasZeroed, keyVal } = this.state;
    
    let newValue = wasZeroed ? event.target.value : keyVal;
 
    this.setState({
      stateCost: newValue,
      wasZeroed: true,
    });
  };

  handleKeyPress = ch =>{
    this.setState({
      keyVal: ch.key,
    });
  }

  handleBlur = (event) =>{
    const { stateCost } = this.state;
    const { onDataChange} = this.props;

    onDataChange(stateCost);
    this.setState({
      wasZeroed: false,
    });
 };


  render() {
    const { classes } = this.props;
  
    const { stateCost, isNoBooking } = this.state;

    return (
      <div className={classes.container}>
        <TextField
          disabled = {isNoBooking? true: false}
          style = {{width: 70}}
          className={classes.formControl}
          value={stateCost}
          onChange={this.handleChange}
          onBlur={(event) => this.handleBlur(event)}
          onKeyPress={this.handleKeyPress}
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </div>
    );
  }
}

FormattedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormattedInputs);
