export const serverUrl = 'http://svc-dev-plp.webhop.org:9022'


export const ADD_MEMBER = 'ADD_MEMBER'; 
export const DELTE_MEMBER = 'DELTE_MEMBER';
export const MODIFY_MEMBER = 'MODIFY_MEMBER';
export const GET_MEMBER = 'GET_MEMBER';
export const RECEIVE_MEMBER = 'RECEIVE_MEMBER';

export const addMember = (props, dispatch, tenantid) => ({
    type: ADD_MEMBER,
    props: props,
    dispatch: dispatch,
    tenantid: tenantid
})

export const deleteMember = selected => ({
    type: DELTE_MEMBER,
    selected: selected
})
export const modifyMemberg = (value, id, column, dispatch) => ({
    type: MODIFY_MEMBER,
    value: value,
    id: id,
    column: column,
    dispatch: dispatch
})
export const requestMembers = () => ({
    type: GET_MEMBER
})


export const receiveMembers = (members) => ({
    type: RECEIVE_MEMBER,
    members: members,
    receivedAt: Date.now(),
})

export const fetchMembersFromServer = (tenantid) => {
    return dispatch => {
        return fetch(serverUrl + `/members/get/` + tenantid)
            .then(response => response.json())
            .then(json => dispatch(receiveMembers(json)))
    }
}