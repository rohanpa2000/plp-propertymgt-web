import { connect } from 'react-redux'
import LiveGrid from '../components/LiveGrid'
import { reFetchLastIcidents } from '../actions'

const getCourtName = (props) =>{
  const { courtname } = props;
  return courtname;
}

const getCourtTitle = (props) =>{
  const { displayName } = props;
  return displayName;
}

const getTriggerTime = (props) =>{
  const { triggerTime } = props;
  return triggerTime;
}

const getBaseIncidentUrl = (props) => {
  const {baseIncidentUrl} = props;
  return baseIncidentUrl;
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

 
  return (nowNo - lastIncidentNo) <= 2;
  
}

const mapStateToProps = (state, props) => (
  {
    baseIncidentUrl :  getBaseIncidentUrl(props),
    totalIncidents : state.lastIncidents,
    lastIncidents : getLastIncidents(state.lastIncidents, props),
    lastIncidentTime: getLastIncidentTime(state.lastIncidents, props),
    isActive : isActive(state.lastIncidents, props),
    tableTile : getCourtTitle(props),
    triggerTime : getTriggerTime(props)
  });

  const mapDispatchToProps = (dispatch) => ({
    fetchLastIcidents: (lastIncidents) => dispatch(reFetchLastIcidents(lastIncidents,dispatch)),
  });


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveGrid)
