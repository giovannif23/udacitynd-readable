import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import moment from 'moment';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Icon, Tag, Row, Col } from 'antd';

class PostIndex extends React.Component {
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
    const date = post.timestamp ? moment(post.timestamp).format('MMMM Do, YYYY') : undefined

    return (
      <PageTemplate
        header={<Header/>}>
        <Row>
          <Col span={16}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <div style={{ marginBottom: 10, marginTop: 20 }}>
              <Link style={{ marginRight: 15 }} to={`${post.id}/edit`}>
                Edit
              </Link>
              <Link to={`${post.id}/edit`}>
                Delete
              </Link>
            </div>

            <Row>
              <Col>
                <Tag color="blue">
                  <Icon type="user" /> {post.author}
                </Tag>
                <Tag color="blue">
                  <Icon type="like-o" /> {post.voteScore}
                </Tag>
                <Tag color="blue">
                  <Icon type="calendar" /> {date}
                </Tag>
              </Col>
            </Row>
          </Col>

          <Col span={8}>
            <h2>Comments</h2>
          </Col>
        </Row>

      </PageTemplate>
    );
  }
}

export default PostIndex;