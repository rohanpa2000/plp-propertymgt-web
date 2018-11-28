export const REFETCH_LAST_INCIDENTS = 'REFETCH_LAST_INCIDENTS';
export const RECEIVE_LAST_INCIDENTS = 'RECEIVE_LAST_INCIDENTS';

export const reFetchLastIcidents = (lastIncidents, dispatch) => ({
    type: REFETCH_LAST_INCIDENTS,
    lastIncidents: lastIncidents,
    dispatch: dispatch
})

export const receiveLastIncidents = (lastIncidents) => ({
    type: RECEIVE_LAST_INCIDENTS,
    lastIncidents: lastIncidents
})

export const fetchLastIncidentsFromServer = () => {
    return dispatch => {
        return fetch(`http://jaela.dvrdns.org:9022/bookings/getlastincidents`)
            .then(response => response.json())
            .then(json => dispatch(receiveLastIncidents(json)))
    }
}

