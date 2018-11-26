import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Tooltip from '@material-ui/core/Tooltip';
import CompletedIcon from '@material-ui/icons/Done';
import ProblemIcon from '@material-ui/icons/ReportProblem';
import NotCompletedIcon from '@material-ui/icons/Help';
import Button from '@material-ui/core/Button';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/pink';

class Completed extends PureComponent {

    constructor(props) {
        super(props);
        const { isCompleted, isNoBooking, isPlayed} = this.props;

  

        this.state = {
            stateIsCompleted: isCompleted,
            isNoBooking: isNoBooking,
            isPlayed: isPlayed,
        }
    }

    handeCompletedClick = () => {
        const { stateIsCompleted } = this.state;
        const { onDataChange } = this.props;

        let newState = stateIsCompleted ? false : true;

        onDataChange(newState);

        this.setState({ stateIsCompleted: newState });
    }

    render() {
        const { classes } = this.props;
        const { stateIsCompleted, isNoBooking, isPlayed} = this.state;

        return (
            <div className={classes.actions}>
                {isNoBooking ? (
                    <Button disabled={true} variant="fab" aria-label="no booking for this time" mini

                        onClick={this.handeCompletedClick}
                        className={classNames(classes.margin, classes.cssRed)}
                    >
                        <ProblemIcon />
                    </Button>
                ) : (

                        stateIsCompleted ? (
                            <Tooltip title="Booking is complete">
                                <Button variant="fab" aria-label="Booking is complete" mini
                                    color="primary"
                                    onClick={this.handeCompletedClick}
                                    className={classNames(classes.margin, classes.cssGreen)}>
                                    <CompletedIcon />
                                </Button>
                            </Tooltip>
                        ) : (
                            isPlayed ? (
                                    <Tooltip title="Booking is complete">
                                        <Button variant="fab" aria-label="Booking is complete" mini
                                            color="primary"
                                            onClick={this.handeCompletedClick}

                                            className={classNames(classes.margin, classes.cssYello)}>
                                            <NotCompletedIcon />
                                        </Button>
                                    </Tooltip>

                                )
                                    : (
                                        <Tooltip title="Booking is complete">
                                            <Button variant="fab" aria-label="Booking is complete" mini
                                                color="primary"
                                                onClick={this.handeCompletedClick}

                                                className={classNames(classes.margin, classes.cssPurple)}>
                                                <NotCompletedIcon />
                                            </Button>
                                        </Tooltip>
                                    )))}
            </div>
        );
    }
}

const styles = theme => ({

    margin: {
        margin: theme.spacing.unit,
    },

    cssYello: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: '#FFB300',
        '&:hover': {
            backgroundColor: '#FFB300',
        },
    },

    cssPurple: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },

    cssGreen: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    cssRed: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:disabled': {
            backgroundColor: '#FF1744',
            color: 'white'
        },
        '&:hover': {
            backgroundColor: red[700],
        },
    },
});

Completed.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Completed);
