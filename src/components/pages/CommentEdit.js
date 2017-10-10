import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { getComment, updateComment } from '../../actions';
import { capitalize } from '../utils/helpers';
import moment from 'moment';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Col, Form, Icon, Input, Tag, message, Row, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class CommentEdit extends React.Component {
  state = {
    id: '',
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
    const comment = this.state;
    comment.timestamp = Date.now();
    
    this.props.update(id, comment)
      .then((res) => {
        message.success('Comment was updated');
      })
      .then(() => {
        this.props.history.goBack();
      });
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

    this.props.get(id)
      .then((res) => {
        const { comment } = res;
        this.setState({
          id: comment.id,
          body: comment.body,
        });
      });
  }

  render() {

    return (
      <PageTemplate
        header={<Header />}>
        <Row>
          <Col span={12} offset={6}>
            <h1>Edit Comment</h1>

            <br />

            <Form style={{ width: '100%' }} layout="vertical" onSubmit={this.handleSubmit}>
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

function mapStateToProps({ comment }) {
  return {
    comment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get: (data) => dispatch(getComment(data)),
    update: (id, data) => dispatch(updateComment(id, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);
