import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';

class CategoryIndex extends React.Component {
  render() {
    return (
      <PageTemplate
        header={<Header/>}>
        <h1>Category Index</h1>
      </PageTemplate>
    );
  }
}

export default CategoryIndex;