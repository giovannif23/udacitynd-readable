import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import moment from 'moment';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { 
  Avatar, 
  Button, 
  Card, 
  Col, 
  Form,
  Icon, 
  Input,
  Tag, 
  Row, 
  Popconfirm, 
  message, 
  Modal 
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class PostIndex extends React.Component {
  state = {
    comments: [],
    post: {},
    commentModalVisible: false,
  };

  setCommentModalVisible = (commentModalVisible) => {
    this.setState({ 
      commentModalVisible 
    });
  }

  confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  }

  cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  }


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
              <Popconfirm 
                title="Are you sure delete this post?" 
                onConfirm={this.confirm} 
                onCancel={this.cancel} 
                okText="Yes" 
                cancelText="No">
                <a href="#">Delete</a>
              </Popconfirm>
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
                  <Popconfirm
                    title="Are you sure delete this comment?"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No">
                    <a href="#">Delete</a>
                  </Popconfirm>
                </div>
              </Card>
            ))}
          </Col>
        </Row>
        
        <br />
        
        <Row>
          <Col span={12} offset={6}>
            <Button onClick={() => this.setCommentModalVisible(true)}>Add Comment</Button>
          </Col>
        </Row>

        <Modal
          title="Comment"
          wrapClassName="vertical-center-modal"
          visible={this.state.commentModalVisible}
          onOk={() => this.setCommentModalVisible(false)}
          onCancel={() => this.setCommentModalVisible(false)}
          okText="Save"
          cancelText="Cancel"
        >
          <Form style={{ width: '100%' }} layout="vertical" onSubmit={this.handleSubmit}>
            <FormItem label="Title">
              <Input
                style={{ width: '100%' }}
                value={post.title} />
            </FormItem>

            <FormItem label="Body">
              <TextArea
                rows={4}
                style={{ width: '100%' }}
                value={post.body} />
            </FormItem>
          </Form>
        </Modal>
      </PageTemplate>
    );
  }
}

export default PostIndex;