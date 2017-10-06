import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';

class PostEdit extends React.Component {
  render() {
    return (
      <PageTemplate
        header={<Header />}>
        <h1>Edit Post</h1>
      </PageTemplate>
    );
  }
}

export default PostEdit;