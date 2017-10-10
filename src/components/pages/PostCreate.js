import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as API from '../utils/api';
import { addPost } from '../../actions';
import { uuidv4 } from '../utils/helpers';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Col, Form, Icon, Input, message, Tag, Row, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PostCreate extends React.Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: 'react',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const post = this.state;
    post.id = uuidv4();
    this.props.add(post)
      .then(() => {
        message.success('Post was created');
      })
      .then(() => {
        this.props.history.goBack();
      });
  }

  handleInputChange = (e) =>  {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ 
      [name]: value
    });
  }

  handleSelectChange = (value) => {
    this.setState({ category: value });
  }

  render() {
    return (
      <PageTemplate
        header={<Header/>}>
        <Row>
          <Col span={12} offset={6}>
            <h1>Create Post</h1>

            <br />

            <Form style={{ width: '100%' }} layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label="Title">
                <Input
                  name="title"
                  style={{ width: '100%' }}
                  value={this.state.title}
                  onChange={this.handleInputChange} />
              </FormItem>

              <FormItem label="Body">
                <TextArea
                  name="body"
                  rows={4}
                  style={{ width: '100%' }}
                  value={this.state.body}
                  onChange={this.handleInputChange} />
              </FormItem>

              <FormItem label="Author">
                <Input
                  name="author"
                  style={{ width: '100%' }}
                  value={this.state.author}
                  onChange={this.handleInputChange} />
              </FormItem>

              <FormItem label="Category">
                <Select
                  style={{ width: '100%' }}
                  value={this.state.category} onChange={this.handleSelectChange}>
                  <Option value="react">React</Option>
                  <Option value="redux">Redux</Option>
                  <Option value="udacity">Udacity</Option>
                </Select>
              </FormItem>

              <Button htmlType="submit" type="primary" size="large">Save</Button>
            </Form>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

function mapStateToProps ({ post }) {
  return {
    post
  }
}

function mapDispatchToProps (dispatch) {
  return {
    add: (data) => dispatch(addPost(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);