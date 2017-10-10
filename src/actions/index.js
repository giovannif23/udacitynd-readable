import * as API from '../components/utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';

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

export function updatePost (id, post) {
  return dispatch => {
    return API.updatePost(id, post)
      .then(json => dispatch(updatePostSuccess(json)));
  }
}

export function updatePostSuccess (json) {
  return {
    type: UPDATE_POST_SUCCESS,
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

export function dispatchAddComment (comment) {
  return dispatch => {
    return API.createComment(comment)
      .then(json => dispatch (addComment(json)))
  }
}

export function addComment (json) {
  return {
    type: ADD_COMMENT,
    comment: json, 
  }
}

export function getPostComments (id) {
  return dispatch => {
    return API.getPostComments(id)
      .then(json => dispatch(receivePostComments(json)));
  }
}

export function receivePostComments (json) {
  return {
    type: RECEIVE_POST_COMMENTS,
    comments: json,
  }
}