import { combineReducers } from 'redux';

import {
  ADD_POST,
  ADD_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  REQUEST_POST,
  RECEIVE_POST,
  RECEIVE_POSTS,
  POST_REMOVED,
  ADD_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  COMMENT_REMOVED,
  RECEIVE_POST_COMMENTS,
} from '../actions';

function posts (state = [], action) {
  let newState = state.slice();
  switch (action.type) {
    case ADD_POST :
      return [...state, action.post];
    
    case ADD_POST_SUCCESS :
      return Object.assign({}, state, action.post);
    
    case UPDATE_POST :
      return {
        ...state,
        title: action.post.title,
        body: action.post.body,
      }

    case UPDATE_POST_SUCCESS :
      return Object.assign({}, state, action.post);
    
    case REQUEST_POST :
      return Object.assign({}, state, action.post);
    
    case RECEIVE_POST :
      return Object.assign({}, state, action.post);
    
    case RECEIVE_POSTS :
      return Object.assign([{}], state, action.posts);
    
    case POST_REMOVED:
      return Object.assign({}, state, action.posts);
    
    default :
      return state;
  }
}

function comments (state = [], action) {
  let newState = state.slice();
  switch (action.type) {
    case ADD_COMMENT:
      newState.splice(action.index, 0, action.comment)
      return newState;

    case UPDATE_COMMENT_SUCCESS :
      return Object.assign({}, state, action.comment);
    
    case COMMENT_REMOVED:
      return state.filter(comment => comment.id !== action.commentId);

    case RECEIVE_POST_COMMENTS :
      return Object.assign([{}], state, action.comments);
      
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
});