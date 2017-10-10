import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost, updatePost } from '../../actions';
import { capitalize } from '../utils/helpers';
import moment from 'moment';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Col, Form, Icon, Input, Tag, message, Row, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PostEdit extends React.Component {
  state = {
    id: '',
    title: '',
    body: '',
  };

  setCategory = (value) => {
    this.setState({
      post: {
        category: value
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.state;
    const post = this.state;

    this.props.update(id, post)
      .then(() => {
        message.success('Post was updated');
      })
      .then(() => {
        this.props.history.goBack();
      });
    // API.editPost(id, post)
    //   .then(() => {
    //     message.success('Post was updated');
    //   })
    //   .then(() => {
    //     this.props.history.goBack();
    //   });
  };

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    // Get post
    this.props.get(id)
      .then((res) => {
        const { post } = res;
        this.setState({
          id: post.id,
          title: post.title,
          body: post.body,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      // Do something
    }
  }

  render() {
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

              <Button htmlType="submit" type="primary" size="large">Save</Button>
            </Form>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

function mapStateToProps({post}) {
  return {
    post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get: (data) => dispatch(getPost(data)),
    update: (id, data) => dispatch(updatePost(id, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
