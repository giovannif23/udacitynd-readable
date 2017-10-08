const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';
let token = localStorage.token;

if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json',
}

export const getCategories = () => 
  fetch(`${api}/categories`, { headers })
    .then(res => res.json());

export const getPostsByCategory = (category) => 
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json());

export const getPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const getPost = (id) => 
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json());

export const getPostComments = (id) => 
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json());

export const createPost = (post) => 
  fetch(`${api}/posts/`, { 
      headers, 
      method: 'POST',
      body: JSON.stringify(post),
    })
    .then(res => res.json());

export const editPost = (id, post) => 
  fetch(`${api}/posts/${id}`, { 
      headers, 
      method: 'PUT',
      body: JSON.stringify(post),
    })
    .then(res => res.json());

export const getComment = (id) => 
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json());

export const createComment = (comment) =>
  fetch(`${api}/comments`, {
      headers,
      method: 'POST',
      body: JSON.stringify(comment),
    })
    .then(res => res.json());

export const editComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify(comment),
    })
    .then(res => res.json());