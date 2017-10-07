export const ADD_COMMENT = 'ADD_COMMENT';

export function addComment ({ comment, author }) {
  return {
    type: ADD_COMMENT,
    comment, 
    author
  }
}