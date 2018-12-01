import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';

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

class Name extends React.Component {

  constructor(props){

    super(props);
    const { name } = this.props;

    this.state = {
      stateName: name,
    }
  }

  handleChange = event => {

    let newValue = event.target.value;

    this.setState({
      stateName: newValue,
    });
 }; 


  handleBlur = (event) => {
    const { onDataChange } = this.props;
    onDataChange(event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { stateName } = this.state;


    return (
      <div>
        <Input
          className={classes.input}

          style={{ width: 120 }}
          value={stateName}
          onChange = {this.handleChange}
          onBlur={event => this.handleBlur(event)}
          id="input-with-icon-textfield"
          InputProps={{
            className: classes.input,
            startAdornment: (
              <InputAdornment style={{ width: 25 }} position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

Name.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Name);
