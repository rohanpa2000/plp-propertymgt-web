import { combineReducers } from 'redux'
import bookings from './users'
import filterDate from './filterDate'
import totalCost from './totalCost'
import lastincidents from './lastincidents'

export default combineReducers({
    bookings,
    filterDate,
    totalCost,
    lastincidents
})