import * as API from '../components/utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

export function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function requestPost (id) {
  return {
    type: REQUEST_POST,
    id,
  }
}

export function receivePost (json) {
  return {
    type: RECEIVE_POST,
    post: json,
  }
}

export function getPost (id) {
  return dispatch => {
    dispatch (requestPost(id))
    return API.getPost(id)
      .then(json => dispatch(receivePost(json)));
  }
}

export function addComment ({ author, comment }) {
  return {
    type: ADD_COMMENT,
    comment, 
  }
}