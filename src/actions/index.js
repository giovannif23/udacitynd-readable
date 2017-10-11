import * as API from '../components/utils/api';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const POST_REMOVED = 'POST_REMOVED';

export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const COMMENT_REMOVED = 'COMMENT_REMOVED';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
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

export function voteForPost (id, vote) {
  return dispatch => {
    return API.voteForPost(id, vote)
      .then(json => dispatch(updatePostSuccess(json)));
  }
}

export function voteForPostOnCard (id, vote) {
  return dispatch => {
    return API.voteForPost(id, vote)
      .then(json => dispatch(updatePostSuccess(json)))
      .then(() => dispatch(getPosts()));
  }
}

export function updatePostSuccess (json) {
  return {
    type: UPDATE_POST_SUCCESS,
    post: json,
  }
}

export function getPosts() {
  return dispatch => {
    return API.getPosts()
      .then(json => dispatch(receivePosts(json)));
  }
}

export function getPost (id) {
  return dispatch => {
    return API.getPost (id)
      .then(json => dispatch(receivePost(json)));
  }
}

export function receivePost(json) {
  return {
    type: RECEIVE_POST,
    post: json,
  }
}

export function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
  }
}

export function deletePost (id) {
  return dispatch => {
    return API.deletePost(id)
      .then(json => dispatch(postRemoved(json)));
  }
}

export function postRemoved(json) {
  console.log('postRemoved', json)
  return {
    type: POST_REMOVED,
    post: json,
  }
}


export function dispatchAddComment (comment) {
  return dispatch => {
    return API.createComment (comment)
      .then(json => dispatch (addComment(json)))
  }
}

export function addComment (json) {
  return {
    type: ADD_COMMENT,
    comment: json, 
  }
}

export function commentRemoved (id) {
  return {
    type: COMMENT_REMOVED,
    commentId: id,
  }
}

export function updateComment (id, comment) {
  return dispatch => {
    return API.updateComment (id, comment)
      .then(json => dispatch(addComment(json)));
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

export function getComment (id) {
  return dispatch => {
    return API.getComment(id)
      .then(json => dispatch(receiveComment(json)));
  }
}

export function receiveComment (json) {
  return {
    type: RECEIVE_COMMENT,
    comment: json,
  }
}

export function deleteComment (id) {
  return dispatch => {
    return API.deleteComment (id)
      .then(json => dispatch(commentRemoved(id)));
  }
}

export function updateCommentSuccess(json) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    comment: json,
  }
}

export function voteForComment(id, vote) {
  return dispatch => {
    return API.voteForComment(id, vote)
      .then(json => dispatch(getPostComments(json['parentId'])));
  }
}

