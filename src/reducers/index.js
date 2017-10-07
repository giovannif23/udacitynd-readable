import {
  ADD_COMMENT,
} from '../actions';

function comments (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT :
      const { comment } = action;

    default :
      return state;
  }
}