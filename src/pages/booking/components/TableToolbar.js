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
import moment from 'moment';
import Gallery from '../components/Gallery'

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



class EnhancedTableToolbar extends React.Component {

    getTableTitle(tableTitle) {
        return tableTitle;
    }

  
    render() {
        const { onDeleteClick, onAddClick, numSelected, classes, tableTile, isActive, lastIncidentTime,
             baseIncidentUrl, lastIncidents } = this.props;

        let thumbPath = '';

        if (lastIncidents.length > 0) {
            thumbPath = lastIncidents[0].pathToImage;
        }

        const caption = "player";
        const orientation = "square";


        //console.log ("PARAMS " + this);   

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

                <div style={{ width: 150}}> 

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

                <div className={classes.spacer} />
                <div>
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


                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete booking">
                            <Button variant="fab" aria-label="Delete booking" mini
                                color="secondary" className={classes.button}
                                onClick={onDeleteClick}>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    ) : (
                            <Tooltip title="Add booking">
                                <Button variant="fab" aria-label="Add booking" mini
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
