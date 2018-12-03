import { ADD_MEMBER, DELTE_MEMBER, MODIFY_MEMBER, GET_MEMBER, RECEIVE_MEMBER, fetchMembersFromServer } from '../actions'
import { NAME, NICK_NAME, DISPLAY_NAME, PHONE, EMAIL, POSTAL } from '../components/Constants'

let counter = 0;

function creatMember(id,tenantid,name,nickName,displayName,phone,email,postal, isDeleted,isNew) {

    const min = 1;
    const max = 1000;
    const key = min + Math.random() * (max - min);

  return { id,tenantid,name,nickName,displayName,phone,email,postal, key, isDeleted, isNew};
}

const addMember = (membersData, props, tenantid) => {
  //const { tenantid } = props;

  counter = counter - 1;
  const newItem = creatMember(counter, tenantid,'','','','','','',false, true);

  const updatedData = [
    ...membersData,
    newItem
  ];

  return updatedData;
};

const deleteMember = (membersData, selected) => {
  return membersData.map(member =>
    (selected.includes(member.id))
      ? { ...member, isDeleted: true }
      : member
  )
}

const modifyMember = (membersData, value, id, column) => {
  switch (column) {
    case NAME:
      return membersData.map(member =>
        (id === member.id)
          ? { ...member, name: value }
          : member
      )
    case NICK_NAME:
      return membersData.map(member =>
        (id === member.id)
          ? { ...member, nickName: value }
          : member
      )
    case DISPLAY_NAME:
      return membersData.map(member =>
        (id === member.id)
          ? { ...member, displayName: value }
          : member
      )
    case PHONE:
      return membersData.map(member =>
        (id === member.id)
          ? { ...member, phone: value }
          : member
      )
    case EMAIL:
      return membersData.map(member =>
        (id === member.id)
          ? { ...member, email: value }
          : member
      )
    case POSTAL:
      return membersData.map(member =>
        (id === member.id)
          ? { ...member, postal: value }
          : member
      )
    default:
      return membersData
  }
}

const receiveMembers = members => {
  const newData = members.map(member =>
    creatMember(member.id,
      member.tenantid,
      member.name,
      member.nickName,
      member.displayName,
      member.phone,
      member.email,
      member.postal,
      false,
      false
    ))

  return newData;
}

const members = (memberData = [], action) => {
  switch (action.type) {
    case ADD_MEMBER:
      const addedMembers = addMember(memberData, action.props, action.tenantid);
      addMemberToServer(addedMembers, action.dispatch, action.tenantid);
      return addedMembers;
    case DELTE_MEMBER:
      const deleteBookings = deleteMember(memberData, action.selected);
      deleteMemberFromServer(deleteBookings);
      return deleteBookings;
    case MODIFY_MEMBER:
      const updatedBooking = modifyMember(memberData, action.value, action.id, action.column);
      updateMemberToServer(updatedBooking, action.id, action.dispatch, action.column);
      return updatedBooking;
    case GET_MEMBER:
      return fetchMembersFromServer(action.tenantid);
    case RECEIVE_MEMBER:
      return receiveMembers(action.members);

    default:
      return memberData;
  }
}

const deleteMemberFromServer = (members) => {
  const member = members.filter(item => item.isDeleted === true)

  if (member.length > 0) {
    fetch(`http://jaela.dvrdns.org:9022/members/delete`, {
      method: "POST",
      body: JSON.stringify(member),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => console.log(response))
  }
}



const addMemberToServer = async(members, dispatch, tenantid) => {
  const member = members.filter(item => item.isNew === true)

  if (member.length > 0) {
      await fetch(`http://jaela.dvrdns.org:9022/members/add`, {
      method: "POST",
      body: JSON.stringify(member),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    dispatch(fetchMembersFromServer(tenantid))
  }
}

const updateMemberToServer = async(members, id, dispatch, columnName) => {
  const member = members.filter(item => item.id === id)

  if (member.length > 0) {
      await fetch(`http://jaela.dvrdns.org:9022/members/update`, {
      method: "POST",
      body: JSON.stringify(member[0]),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (columnName === NICK_NAME){
      dispatch(fetchMembersFromServer(member[0].tenantid))
    }
  }
}

export default members
