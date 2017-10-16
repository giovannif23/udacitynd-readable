import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Icon, Row, Col } from 'antd';

class ErrorPage extends React.Component {
  state = {};

  componentDidMount() {}

  render() {

    return (
      <PageTemplate
        header={<Header />}>
        <Row>
          <Col span={12} offset={6}>
            <h1 style={{ marginBottom: 30, marginTop: 20 }}>Oops...</h1>
            <p>We're sorry. That page can't be found. Please go <Link to="/">back Home </Link> and try again.</p>
          </Col>

        </Row>
      </PageTemplate>
    );
  }
}

export default ErrorPage;