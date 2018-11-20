/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Clock from 'react-live-clock';


const styles = theme => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 10,
        border: 0,
        width: '50%',
        textAlign: 'center',
        color: 'white',
        height: '20px',
        padding: '20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        textAlign: 'center'
    },
});


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

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

    render() {
        const { classes, totalCollected, tobeCollected } = this.props;

        return (

            <div className={classes.formControl}>
                <TextField
                    disabled={true}
                    style={{ width: 130 }}
                    label="Paid"
                    className={classes.formControl}
                    value={totalCollected}
                    id="formatted-numberformat-input"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                />
                +
        <TextField
                    disabled={true}
                    error={true}
                    style={{ width: 130 }}
                    label="To be paid"
                    className={classes.formControl}
                    value={tobeCollected}
                    id="formatted-numberformat-input"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                />
                =
        <TextField
                    disabled={true}
                    style={{ width: 130 }}
                    label="Total collection"
                    className={classes.formControl}
                    value={tobeCollected + totalCollected}
                    id="formatted-numberformat-input"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                />

                 <div style={{ display: 'inline-block' }}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Local time: <Clock format={'hh:mm:ss A'} ticking={true} /> </div>

                

            </div>


        );
    }
}

FormattedInputs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormattedInputs);
