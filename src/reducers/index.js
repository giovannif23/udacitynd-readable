import { combineReducers } from 'redux';

import {
  ADD_POST,
  ADD_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  REQUEST_POST,
  RECEIVE_POST,
  RECEIVE_POSTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  COMMENT_REMOVED,
  RECEIVE_POST_COMMENTS,
} from '../actions';

const initialState = {
  post: {
    id: null,
    timestamp: null,
    title: null,
    body: null,
    author: null,
    category: null,
  }
}

function post (state = initialState.post, action) {
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
      return Object.assign({}, state, action.posts);
    
    default :
      return state;
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.comment];
    
    case UPDATE_COMMENT:
      return [...state, action.comment];

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
  post,
  comments,
});