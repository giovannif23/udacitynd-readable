import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';

class PostCreate extends React.Component {
  render() {
    return (
      <PageTemplate
        header={<Header/>}>
        <h1>Add Post</h1>
      </PageTemplate>
    );
  }
}

export default PostCreate;