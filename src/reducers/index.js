import { combineReducers } from 'redux';

import {
  ADD_POST,
  ADD_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  REQUEST_POST,
  RECEIVE_POST,
  ADD_COMMENT,
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
  const { post } = action;

  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        id: post.id,
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
      };
    
    case ADD_POST_SUCCESS :
      return Object.assign({}, state, post);
    
    case UPDATE_POST :
      return {
        ...state,
        title: post.title,
        body: post.body,
      }

    case UPDATE_POST_SUCCESS :
      return Object.assign({}, state, post);
    
    case REQUEST_POST :
      return Object.assign({}, state, post);
    
    case RECEIVE_POST :
      return {
        ...state,
        id: post.id,
        title: post.title,
        body: post.body,
      };
    
    default :
      return state;
  }
}

function comments (state = [], action) {
  console.log('comments', action)
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.comment];

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