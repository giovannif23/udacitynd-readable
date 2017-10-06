import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import moment from 'moment';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Icon, Tag, Row, Col } from 'antd';

class PostIndex extends React.Component {
  state = {
    post: {},
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log('id', id)

    API.getPost(id)
      .then((res) => {
        this.setState({
          post: res,
        });
      });
  }

  render() {
    const { post } = this.state;
    const date = post.timestamp ? moment(post.timestamp).format('MMMM Do, YYYY') : undefined

    console.log('post', post)

    return (
      <PageTemplate
        header={<Header/>}>
        <Row>
          <Col>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Tag color="purple">
              <Icon type="user" /> {post.author}
            </Tag>
            <Tag color="purple">
              <Icon type="like-o" /> {post.voteScore}
            </Tag>
            <Tag color="purple">
              <Icon type="calendar" /> {date}
            </Tag>
          </Col>
        </Row>

      </PageTemplate>
    );
  }
}

export default PostIndex;