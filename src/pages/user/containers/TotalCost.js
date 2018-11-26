import { connect } from 'react-redux'
import Total from '../components/Total2'

const mapStateToProps = (state) => (
  {
    totalCollected : getTotalCollected(state.bookings),
    tobeCollected : getTobeCollected(state.bookings),
  });

const getTotalCollected = (bookings) =>{
    let totalCost = 0;

    const playedBookings = bookings.filter(item => item.isCompleted && !item.isDeleted);

    playedBookings.map(item => totalCost = totalCost + parseInt(item.cost,0));

    return totalCost;
}

const getTobeCollected = (bookings) =>{
    let totalCost = 0;

    const playedBookings = bookings.filter(item => !item.isCompleted && !item.isDeleted);

    playedBookings.map(item => totalCost = totalCost + parseInt(item.cost,0));

    return totalCost;
}

export default connect(
  mapStateToProps
)(Total)
