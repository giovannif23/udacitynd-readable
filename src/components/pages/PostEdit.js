import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import moment from 'moment';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Col, Form, Icon, Input, Tag, Row, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PostEdit extends React.Component {
  state = {
    post: {},
  };

  setCategory = (value) => {
    this.setState({
      post: {
        category: value
      }
    });
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
        <Row>
          <Col span={12} offset={6}>
            <h1>Edit Post</h1>
            
            <br />

            <Form style={{ width: '100%' }} layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label="Title">
                <Input 
                  style={{ width: 500 }}
                  value={post.title} />
              </FormItem>

              <FormItem label="Body">
                <TextArea
                  rows={4}
                  style={{ width: 500 }}
                  value={post.body} />
              </FormItem>

              <FormItem label="Author">
                <Input
                  style={{ width: 500 }}
                  value={post.author} />
              </FormItem>

              <FormItem label="Category">
                {post.category &&
                  <Select 
                    style={{ width: 500 }}
                    defaultValue={post.category}>
                    <Option value="react">React</Option>
                    <Option value="redux">Redux</Option>
                    <Option value="udacity">Udacity</Option>
                  </Select>
                }
              </FormItem>

              <Button type="primary" size="large">Save</Button>
            </Form>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default PostEdit;