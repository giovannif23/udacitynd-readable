import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import moment from 'moment';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Avatar, Button, Card, Col, Icon, Tag, Row } from 'antd';

class PostIndex extends React.Component {
  state = {
    comments: [],
    post: {},
  };

  sortByVoteScore = ((a, b) => {
    var a = a.voteScore;
    var b = b.voteScore;
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  });
  
  componentDidMount() {
    const id = this.props.match.params.id;

    API.getPost(id)
      .then((res) => {
        this.setState({
          post: res,
        });
      })
      .then(() => {
        API.getPostComments(this.state.post.id)
          .then((res) => {
            console.log(res)
            this.setState({
              comments: res,
            });
          })
      });
  }

  render() {
    const { comments, post } = this.state;
    const date = post.timestamp ? moment(post.timestamp).format('MMMM Do, YYYY') : undefined

    return (
      <PageTemplate
        header={<Header/>}>
        <Row>
          <Col span={12} offset={6}>
            <h1 style={{ marginBottom: 20 }}>{post.title}</h1>
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
        </Row>
        
        <br />
        <br />
        <br />
        
        <Row>
          <Col span={12} offset={6}>
            <h2>{comments.length} Comments</h2>

            <br />

            {comments.sort(this.sortByVoteScore).map((comment, index) => (
              <Card key={index}>
                <Avatar icon="user" />
                <h3>{comment.author}</h3>
                <p>{comment.body}</p>

                <br />

                <Tag color="blue">
                  <Icon type="like-o" /> {comment.voteScore}
                </Tag>
                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                  <Link style={{ marginRight: 15 }} to={`${comment.id}/edit`}>
                    Edit
                  </Link>
                  <Link to={`${comment.id}/edit`}>
                    Delete
                  </Link>
                </div>
              </Card>
            ))}
          </Col>
        </Row>
        
        <br />
        
        <Row>
          <Col span={12} offset={6}>
            <Button>Add Comment</Button>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

export default PostIndex;