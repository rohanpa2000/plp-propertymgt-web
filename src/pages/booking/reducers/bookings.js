import { ADD_BOOKING, DELTE_BOOKING, MODIFY_BOOKING, FETCH_BOOKINGS, RECEIVE_BOOKINGS, fetchBookingsFromServer, serverUrl } from '../actions'
import { CUSTOMER_NAME, COST, COMPLETED, START_TIME, END_TIME } from '../components/Constants'

import Moment from 'moment';

let counter = 0;


function createDataFromDB(id, courtName, bookingDate, startTime, endTime, customer, cost, isCompleted, 
  actualStartTime,
  actualEndTime,
  isPlayed,
  isDeleted, isNew, isNoBooking = false, imageLinks = '', tenantId, itemId, memberId) {

    const min = 1;
    const max = 1000;
    const key = min + Math.random() * (max - min);

    //console.log('itemId ' + itemId);

  return { id, courtName, bookingDate, startTime, endTime, customer, cost, isCompleted,  
          actualStartTime,
          actualEndTime,
          isPlayed,
          isDeleted, isNew, isNoBooking,imageLinks, key , tenantId, itemId, memberId};
}

const addBooking = (bookingData, props, filterDate, tenantId, itemId) => {
  const { courtname } = props;

  filterDate.setHours(23);
  filterDate.setMinutes(0);

  const nowTime = Moment(filterDate).format("YYYYMMDDHHmmss");

  counter = counter - 1;
  const newItem = createDataFromDB(counter, courtname, 
    nowTime , nowTime, nowTime, '', 0, false,'','',
    false, false, true,false,'',tenantId, itemId, -2);

    console.log('newItem ' + tenantId);

  const updatedData = [
    ...bookingData,
    newItem
  ];

  return updatedData;
};

const deleteBooking = (bookingData, selected) => {
  return bookingData.map(booking =>
    (selected.includes(booking.id))
      ? { ...booking, isDeleted: true }
      : booking
  )
}

const modifyBooking = (bookingData, value, id, column) => {
  switch (column) {
    case CUSTOMER_NAME:
      return bookingData.map(booking =>
        (id === booking.id)
          ? { ...booking, customer: value }
          : booking
      )
    case COST:
      return bookingData.map(booking =>
        (id === booking.id)
          ? { ...booking, cost: value }
          : booking
      )
    case COMPLETED:
      return bookingData.map(booking =>
        (id === booking.id)
          ? { ...booking, isCompleted: value }
          : booking
      )
    case START_TIME:
      return bookingData.map(booking =>
        (id === booking.id)
          ? { ...booking, startTime: value }
          : booking
      )
    case END_TIME:
      return bookingData.map(booking =>
        (id === booking.id)
          ? { ...booking, endTime: value }
          : booking
      )
    default:
      return bookingData
  }
}


const receiveBookings = bookings => {
  const newData = bookings.map(booking =>
    createDataFromDB(booking.id,
      booking.courtName,
      booking.bookingDate,
      booking.startTime,
      booking.endTime,
      booking.customerName,
      booking.cost,
      booking.isCompleted,
      booking.actualStartTime,
      booking.actualEndTime,
      booking.isPlayed,
      false,false,booking.isNoBooking, booking.imageLinks,
      booking.tenantId, booking.itemId, booking.memberId ))

  return newData;
}

const bookings = (bookingData = [], action) => {
  switch (action.type) {
    case ADD_BOOKING:
      const addedBookings = addBooking(bookingData, action.props, action.filterDate, action.tenantId, action.itemId);
      addBookingToServer(addedBookings, action.dispatch, action.filterDate, action.tenantId);
      return addedBookings;
    case DELTE_BOOKING:
      const deleteBookings = deleteBooking(bookingData, action.selected);
      deleteBookingToServer(deleteBookings);
      return deleteBookings;
    case MODIFY_BOOKING:
      const updatedBooking = modifyBooking(bookingData, action.value, action.id, action.column);
      updateBookingsToServer(updatedBooking, action.id);
      return updatedBooking;
    case FETCH_BOOKINGS:
      return fetchBookingsFromServer(action.filterDate);
    case RECEIVE_BOOKINGS:
      return receiveBookings(action.bookings);

    default:
      return bookingData;
  }
}

const deleteBookingToServer = (bookings) => {
  const booking = bookings.filter(item => item.isDeleted === true)

  if (booking.length > 0) {
    fetch( serverUrl + `/bookings/delete`, {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log(response))
  }
}



const addBookingToServer = async(bookings, dispatch, filterDate,tenantId) => {
  const booking = bookings.filter(item => item.isNew === true)

  if (booking.length > 0) {
      await fetch(serverUrl + `/bookings/add`, {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    dispatch(fetchBookingsFromServer(filterDate, tenantId))
  }
}

//https://stackoverflow.com/questions/40334475/in-react-with-redux-how-to-do-post-request
const updateBookingsToServer = (bookings, id) => {
  const booking = bookings.filter(item => item.id === id)

  if (booking.length > 0) {
    fetch(serverUrl + `/bookings/update`, {
      method: "POST",
      body: JSON.stringify(booking[0]),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log(response))
  }
}

export default bookings
