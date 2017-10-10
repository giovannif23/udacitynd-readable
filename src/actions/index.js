import * as API from '../components/utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';

export function addPost (post) {
  return dispatch => {
    return API.createPost(post)
      .then(json => dispatch(addPostSuccess(json)));
  }
}

export function addPostSuccess (json) {
  return {
    type: ADD_POST_SUCCESS,
    post: json,
  }
}

export  function requestPost (id) {
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