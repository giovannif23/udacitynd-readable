import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';

class Index extends React.Component {
  render() {
    return (
      <PageTemplate
        header={<Header/>}>
        <h1>Index</h1>
      </PageTemplate>
    );
  }
}

export default Index;