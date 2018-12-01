import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({

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
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 20%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});


class EnhancedTableToolbar extends React.Component {

    render() {
        const { onDeleteClick, onAddClick, numSelected, classes, tableTile} = this.props;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (

                            <Typography variant="title" id="tableTitle">
                                {tableTile}
                            </Typography>
                        )}
                </div>

                <div className={classes.spacer} />

                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete Member">
                            <Button variant="fab" aria-label="Delete Member" mini
                                color="secondary" className={classes.button}
                                onClick={onDeleteClick}>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    ) : (
                            <Tooltip title="Add Member">
                                <Button variant="fab" aria-label="Add Member" mini
                                    color="primary" className={classes.button}
                                    onClick={onAddClick}>
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        )}
                </div>
            </Toolbar>

        );
    }
}
EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
