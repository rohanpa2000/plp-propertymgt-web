import { connect } from 'react-redux'
import Table from '../components/Table'
import { addBooking, deleteBooking, modifyBooking } from '../actions'
//import moment from 'moment'

const getCourtName = (props) =>{
  const { courtname } = props;
  return courtname;
}

const getCourtTitle = (props) =>{
  const { displayName } = props;
  return displayName;
}

const getCourtTitleShort = (props) =>{
  const { displayNameShort } = props;
  return displayNameShort;
}

const getBaseIncidentUrl = (props) => {
  const {baseIncidentUrl} = props;
  return baseIncidentUrl;
}

const getLocalBaseIncidentUrl = (props) => {
  const {localBaseIncidentUrl} = props;
  return localBaseIncidentUrl;
}

const getLastIncidents = (lastincidents, props) => {
  const fillastIncidents = lastincidents.filter(lastIncident => 
    lastIncident.instanceName === getCourtName(props));

    return fillastIncidents;
}

const getLastIncidentTime = (lastIncidents, props) => {
  const lastIncidentTime =  lastIncidents.filter(lastIncident => 
    lastIncident.instanceName === getCourtName(props))

    

    if (lastIncidentTime.length > 0){
      //console.log("path to image " + lastIncidentTime[0].pathToImage)
      const time = lastIncidentTime[0].createDate;
      const newTime = new Date(time.substring(0,4), time.substring(4,6) - 1,
      time.substring(6,8), time.substring(8,10),
      time.substring(10,12), time.substring(12,14))
      return newTime;
    }
    else 
      return new Date(1900,1,1,1,1,1);
}

const isActive = (lastIncidents, props) => {

  const lastIncident = getLastIncidentTime(lastIncidents, props);
  const lastIncidentNo =  ((lastIncident.getTime() / 1000)/ 60);

  const now = new Date();

  const nowNo =   ((now.getTime() / 1000) / 60);

  //console.log("nowNo " + nowNo);
  //console.log("lastIncidentNo " + lastIncidentNo);
  //console.log("nowNo - lastIncidentNo" + (nowNo - lastIncidentNo));

  return (nowNo - lastIncidentNo) <= 2;
  
  //console.log("nowNo " + nowNo);
}


const getBookings = (bookings, props) => {

  //console.log('props.itemId ' + props.itemId);

  return bookings.filter(booking => 
    booking.itemId === props.itemId &&
    booking.isDeleted === false
  )
}

const mapStateToProps = (state, props) => (
  {
    baseIncidentUrl :  getBaseIncidentUrl(props),
    localBaseIncidentUrl : getLocalBaseIncidentUrl(props),
    lastIncidents : getLastIncidents(state.lastincidents, props),
    lastIncidentTime: getLastIncidentTime(state.lastincidents, props),
    isActive : isActive(state.lastincidents, props),
    data : getBookings(state.bookings, props),
    tableTile : getCourtTitle(props),
    tableTileShort : getCourtTitleShort(props),
    filterDate : state.filterDate
  });

const mapDispatchToProps = (dispatch,props) => ({
  addRow: (filterDate) => dispatch(addBooking(props, dispatch,filterDate,props.tenantId, props.itemId)),
  deleteRow: (selected) => dispatch(deleteBooking(selected)),
  modifyRow: (value, id, column) => dispatch(modifyBooking(value, id, column, dispatch))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
