import { RECEIVE_LAST_INCIDENTS, REFETCH_LAST_INCIDENTS, fetchLastIncidentsFromServer } from '../actions'


function createIncident(instanceName, createDate, pathToImage) {
  return { instanceName, createDate, pathToImage };
}

const lastIncidents = (lastIncidentsData = [], action) => {
  switch (action.type) {
    case RECEIVE_LAST_INCIDENTS:
      const lastIncidents = receiveLastIncidents(action.lastIncidents);
      return lastIncidents;

    case REFETCH_LAST_INCIDENTS:
      //console.log('refetching')
      action.dispatch(fetchLastIncidentsFromServer());
      return action.lastIncidents;

    default:
      return lastIncidentsData;
  }
}

const receiveLastIncidents = lastIncidents => {
  const newData = lastIncidents.map(lastIncident =>
    createIncident(lastIncident.instanceName,
      lastIncident.createDate,
      lastIncident.pathToImage))

  return newData;
}

export default lastIncidents