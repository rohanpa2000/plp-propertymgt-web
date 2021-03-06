import Moment from 'moment';


//export const serverUrl = 'http://localhost:9022'
export const serverUrl = 'http://svc-dev-plp.webhop.org:9022'

export const ADD_BOOKING = 'ADD_BOOKING';
export const DELTE_BOOKING = 'DELETE_BOOKING';
export const MODIFY_BOOKING = 'MODIFY_BOOKING';

export const REQUEST_BOOKINGS = 'REQUEST_BOOKINGS';
export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS';
export const GET_DEFAULT_DATE = 'GET_DEFAULT_DATE';
export const FETCH_BOOKINGS = 'FETCH_BOOKINGS';
export const RE_FETCH_DATE_CHANGE = 'RE_FETCH_DATE_CHANGE';
export const CALCULATE_TOTAL_COST = 'CALCULATE_TOTAL_COST';

export const RECEIVE_LAST_INCIDENTS = 'RECEIVE_LAST_INCIDENTS';
export const REFETCH_LAST_INCIDENTS = 'REFETCH_LAST_INCIDENTS';


export const addBooking = (props, dispatch, filterDate, tenantId, itemId) => ({
    type: ADD_BOOKING,
    props: props,
    dispatch: dispatch,
    filterDate: filterDate,
    tenantId: tenantId,
    itemId: itemId
})


export const deleteBooking = selected => ({
    type: DELTE_BOOKING,
    selected: selected
})

export const modifyBooking = (value, id, column, dispatch) => ({
    type: MODIFY_BOOKING,
    value: value,
    id: id,
    column: column,
    dispatch: dispatch
})

export const requestBookings = () => ({
    type: REQUEST_BOOKINGS
})

export const reFetchLastIcidents = (lastIncidents, dispatch) => ({
    type: REFETCH_LAST_INCIDENTS,
    lastIncidents: lastIncidents,
    dispatch: dispatch
})

export const receiveLastIncidents = (lastIncidents) => ({
    type: RECEIVE_LAST_INCIDENTS,
    lastIncidents: lastIncidents
})

export const receiveBookings = (bookings) => ({
    type: RECEIVE_BOOKINGS,
    bookings: bookings,
    receivedAt: Date.now(),
})

export const reFetchDateChange = (filterDate, dispatch, tenantId) => ({
    type: RE_FETCH_DATE_CHANGE,
    filterDate: filterDate,
    dispatch: dispatch,
    tenantId: tenantId
})

export const calculateTotalCost = (bookings) => ({
    type: CALCULATE_TOTAL_COST,
    bookings: bookings
})


export const fetchBookingsFromServer = (filterDate, tenantId) => {
    return dispatch => {
        //console.log('test');
        const dateFilter = Moment(filterDate).format("YYYYMMDD")
        dispatch(requestBookings)
        return fetch(serverUrl + `/bookings/getbookings/` + dateFilter + '/' + tenantId)
            .then(response => response.json())
            .then(json => dispatch(receiveBookings(json)))
    }
}


export const fetchLastIncidentsFromServer = () => {
    return dispatch => {
        return fetch(serverUrl + `/bookings/getlastincidents`)
            .then(response => response.json())
            .then(json => dispatch(receiveLastIncidents(json)))
    }
}

