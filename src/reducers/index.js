import { combineReducers } from 'redux';

import {
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
  let updateIndex;

  switch (action.type) {    
    case ADD_POST_SUCCESS :
      const postCount = Object.keys(state).length
      return Object.assign({}, state, action.post);
    
    case UPDATE_POST :
      return {
        ...state,
        title: action.post.title,
        body: action.post.body,
      }

    case UPDATE_POST_SUCCESS :
      return [
        ...state,
        Object.assign({}, action.post),
      ];
    
    case RECEIVE_POST :
      return action.post;
    
    case RECEIVE_POSTS :
      return action.posts;
    
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