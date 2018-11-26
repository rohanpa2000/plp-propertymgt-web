import React, { PureComponent } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateInput from 'material-ui-pickers/DatePicker';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { BrowserRouter as Router, Route } from "react-router-dom";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        '&:disabled': {
            backgroundColor: '#26A69A',
            color: 'white'
        },
    },
    input: {
        display: 'none',
    },
});

export class DatePicker extends PureComponent {

    constructor(props) {

        super(props);

        const { filterDate, lastincidents } = props;

        this.state = {
            selectedDate: filterDate,
            lastincidents: lastincidents,
        }
    }

    handleDateChange = (date) => {
        const { reFetch } = this.props;

        reFetch(date);
        this.setState({ selectedDate: date });
    }

    handleToday = () => {

        this.handleDateChange(new Date());

    }

    handleYesterday = () => {
        let yesterday = moment(this.state.selectedDate).add(-1, 'day')
        this.handleDateChange(new Date(yesterday));
    }

    handleTomorrow = () => {
        let tomorrow = moment(this.state.selectedDate).add(1, 'day')
        this.handleDateChange(new Date(tomorrow));
    }

    componentDidMount = () => {
        var intervalId = setInterval(this.timer, 30000);
        this.setState({ intervalId: intervalId });
        //console.log("component mounted");
    }

    componentWillUnmount = () => {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
        console.log("component mounted");
    }

    timer = () => {

        //const { filterDate, lastincidents } = props;
        const { reFetch, reFetchLastIcidents, lastincidents } = this.props;
        reFetch(this.state.selectedDate);
        reFetchLastIcidents(lastincidents);
        //const dt = new Date();
        //console.log("timer caled " + dt);
        //console.log("last incidents " + lastincidents.length);
    }

    setBreak = () => {
        return (
            <br />
        );
    }

    setSpace = () => {
        return (
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        );
    }

    render() {
        const { classes } = this.props;
        const { selectedDate } = this.state;

        return (
            <Router>
                <div>
                    <div style={{ display: 'inline-block' }}>
                        <Button style={{ width: 100 }} variant="contained" color="primary" onClick={this.handleToday} className={classes.button}>
                            {moment(selectedDate).format('dddd')}
                        </Button>
                    </div>
                    <Route  path="/mobile" component={() => this.setBreak()} />
                                        
                    <Route  exact path="/" component={() => this.setSpace()} />
                    <Route  path="/web" component={() => this.setSpace()} />

                    <div style={{ display: 'inline-block' }}>

                        <Button variant="contained" color="primary" onClick={this.handleYesterday} className={classes.button}>
                            {'<<'}
                        </Button>
                    </div>
                    <Route exact path="/mobile" component={() => this.setBreak()} />
                    <div style={{ display: 'inline-block' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateInput
                                style={{ width: 100 }}
                                autoOk
                                format="dd/MM/yyyy"
                                value={selectedDate}
                                onChange={this.handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <Route exact path="/mobile" component={() => this.setBreak()} />
                    <div style={{ display: 'inline-block' }}>
                        <Button variant="contained" color="primary" onClick={this.handleTomorrow} className={classes.button}>
                            {'>>'}
                        </Button>
                    </div>
                </div>
            </Router>
        );
    }


}

export default withStyles(styles)(DatePicker);