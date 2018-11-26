import React, { PureComponent } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimeInput from 'material-ui-pickers/TimePicker';

import Moment from 'moment';

export default class TimePicker extends PureComponent {
  constructor(props){
    super(props);
    const { time, isNoBooking } =  this.props;

    const newTime = new Date(time.substring(0,4), time.substring(4,6) - 1,
                            time.substring(6,8), time.substring(8,10),
                            time.substring(10,12), time.substring(12,14))

    this.state = {
      stateTime: newTime,
      isNoBooking: isNoBooking
    }
  }

  handleDateChange = (date) => {
    const { onDataChange} = this.props;

    const now = new Date(date);
    Moment.locale('en');

    onDataChange(Moment(now).format("YYYYMMDDHHmmss"));
    this.setState({ stateTime: date });
  }

  render() {
    const { stateTime,isNoBooking } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimeInput
            disabled = {isNoBooking? true: false}
            style = {{width: 70}}
            value={stateTime}
            onChange={this.handleDateChange}
        />
      </MuiPickersUtilsProvider>
    );
  }
}