import { combineReducers } from 'redux';

import {
  ADD_POST,
  ADD_COMMENT,
  REQUEST_POST,
  RECEIVE_POST,
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
      const { post } = action;
      return {
        ...state,
        id: post.id,
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
      }
    
    case REQUEST_POST :
      return Object.assign({}, state)
    
    case RECEIVE_POST :
      return {
        ...state,
        id: action.post.id,
        title: action.post.title,
        body: action.post.body,
      }
    
    default :
      return state;
  }
}

function comment (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT :
      const { comment } = action;
      return {
        ...state,

      }

    default :
      return state;
  }
}

export default combineReducers({
  post,
  comment,
});