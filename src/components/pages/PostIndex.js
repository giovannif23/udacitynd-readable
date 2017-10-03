import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';

class PostIndex extends React.Component {
  render() {
    return (
      <PageTemplate
        header={<Header/>}>
        <h1>Post Detail</h1>
      </PageTemplate>
    );
  }
}

export default PostIndex;