import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as API from '../utils/api';
import { addPost } from '../../actions';
import { uuidv4 } from '../utils/helpers';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Col, Form, Icon, Input, message, Tag, Row, Select, notification } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PostCreate extends React.Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: 'react',
    errors: {
      title: false,
      body: false,
      author: false,
    }
  };

  validate = (title, body, author) => {
    return {
      title: title.length === 0,
      body: body.length === 0,
      author: author.length === 0,
    };
  }
  
  handleSubmit = (e) => {
    e.preventDefault();

    const post = this.state;
    const empty = this.validate(post.title, post.body, post.author);
    const formInvalid = empty.title || empty.body || empty.author;

    if (formInvalid) {
      notification.open({
        message: 'Error',
        description: 'Please fill out all form fields.',
        icon: <Icon type="frown-circle" style={{ color: '#f04134' }} />,
      });

      this.setState({
        errors: {
          title: empty.title,
          body: empty.body,
          author: empty.author,
        }
      })
    } else {
      post.id = uuidv4();
      post.timestamp = Date.now();
      
      this.props.add(post)
        .then(() => message.success('Post was created'))
        .then(() => this.props.history.push('/'));
    }

  }

  handleInputChange = (e) =>  {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const invalid = value.length === 0;

    this.setState({ 
      [name]: value, 
      errors: {
        [name]: invalid
      }
    });
  }

  handleSelectChange = (value) => {
    this.setState({ category: value });
  }

  render() {
    console.log('PROPS', this.props)
    return (
      <PageTemplate
        header={<Header/>}>
        <Row>
          <Col span={12} offset={6}>
            <h1>Create Post</h1>
            <small>* All fields are required.</small>
            
            <br />
            <br />

            <Form style={{ width: '100%' }} layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label="Title *">
                <Input
                  name="title"
                  style={{ width: '100%', borderColor: this.state.errors.title && 'red' }}
                  value={this.state.title}
                  onChange={this.handleInputChange} />
              </FormItem>

              <FormItem label="Body *">
                <TextArea
                  name="body"
                  rows={4}
                  style={{ width: '100%', borderColor: this.state.errors.body && 'red' }}
                  value={this.state.body}
                  onChange={this.handleInputChange} />
              </FormItem>

              <FormItem label="Author *">
                <Input
                  name="author"
                  style={{ width: '100%', borderColor: this.state.errors.author && 'red' }}
                  value={this.state.author}
                  onChange={this.handleInputChange} />
              </FormItem>

              <FormItem label="Category *">
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

function mapStateToProps ({post}) {
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