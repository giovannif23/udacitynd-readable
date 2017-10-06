import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import moment from 'moment';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Form, Icon, Input, Tag, Row, Col } from 'antd';

const FormItem = Form.Item;

class PostEdit extends React.Component {
  state = {
    post: {},
  };
  componentDidMount() {
    const id = this.props.match.params.id;

    API.getPost(id)
      .then((res) => {
        this.setState({
          post: res,
        });
      });
  }

  render() {
    const { post } = this.state;
    return (
      <PageTemplate
        header={<Header />}>
        <h1>Edit Post</h1>
        <br />
        <Row>
          <Col span={12}>
            <Form style={{ width: '100%' }} layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="Title">
                <Input 
                  style={{ width: 500 }}
                  value={post.title} />
              </FormItem>
            </Form>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default PostEdit;