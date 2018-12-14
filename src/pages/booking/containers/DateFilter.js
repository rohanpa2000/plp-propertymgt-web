import { connect } from 'react-redux'
import DatePciker from '../components/DatePicker'

import { reFetchDateChange, reFetchLastIcidents } from '../actions'


const mapStateToProps = (state) => (
  {
    filterDate : state.filterDate,
    lastincidents: state.lastincidents
  });

const mapDispatchToProps = (dispatch, props) => ({
  reFetch: (filterDate) => dispatch(reFetchDateChange(filterDate, dispatch, props.tenantId)),
  reFetchLastIcidents: (lastIncidents) => dispatch(reFetchLastIcidents(lastIncidents,dispatch)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePciker)
