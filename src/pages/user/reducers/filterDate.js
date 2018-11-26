import { GET_DEFAULT_DATE, RE_FETCH_DATE_CHANGE, fetchBookingsFromServer } from '../actions'

const filterDate = (filterDate = new Date(), action) => {
    switch (action.type) {
        case GET_DEFAULT_DATE:
            return new Date();

        case RE_FETCH_DATE_CHANGE:
            action.dispatch(fetchBookingsFromServer(action.filterDate));
            return action.filterDate
            
        default:
            return filterDate;
    }
}

export default filterDate
