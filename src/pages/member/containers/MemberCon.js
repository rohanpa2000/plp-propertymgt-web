import { connect } from 'react-redux'
import Table from '../components/Table'
import { addMember, deleteMember, modifyMemberg } from '../actions'

const getTenantid = (props) => {
  const {tenantId} = props;
  return tenantId;
}

const getMembers = (members) => {
  return members.filter(member => 
    member.isDeleted === false
  )
}

const mapStateToProps = (state, props) => (
  {
    data : getMembers(state.members),
    tableTile : 'Members',
    tenantId : getTenantid(props)
  });

const mapDispatchToProps = (dispatch,props) => ({
  addRow: () => dispatch(addMember(props, dispatch,getTenantid(props))),
  deleteRow: (selected) => dispatch(deleteMember(selected)),
  modifyRow: (value, id, column) => dispatch(modifyMemberg(value, id, column, dispatch))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
