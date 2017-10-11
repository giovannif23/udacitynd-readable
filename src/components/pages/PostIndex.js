import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { voteForPost, dispatchAddComment, deleteComment, getPost, getPostComments } from '../../actions';
import { capitalize, uuidv4 } from '../utils/helpers';
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
} from 'antd';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class PostIndex extends React.Component {
  state = {
    comments: [],
    post: {},
    author: '', 
    body: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { post } = this.state;
    const comment = {
      id: uuidv4(),
      parentId: post.id,
      author: this.state.author,
      body: this.state.body,
      timestamp: Date.now(),
    };

    this.props.addComment(comment);
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  confirm = (id) => {
    this.props.deleteComment()
      .then(() => message.success('Comment has been deleted'));
  }

  confirmDeleteComment = (id) => {
    const parentId = this.props.match.params.id;
    this.props.deleteComment(id, parentId)
      .then(() => message.success('Comment has been deleted'));
  }

  voteHandler = (id, vote) => {
    const voteOption = { option: vote };

    this.props.vote(id, voteOption)
      .then((res) => {
        const { post } = res;
        message.success(vote);
        this.setState({
          post
        });
      });
  }

  cancel = (e) => {
    console.log(e);
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
   
    // Get post
    this.props.get(id)
      .then((res) => {
        const { post } = res;
        this.setState({
          post
        });
      })
      .then(() => {
        this.props.getComments(id)
          .then((res) => {
            this.setState({
              comments: res.comments,
            });
          });
        });
  }

  componentDidUpdate(prevProps) {
    if (this.props.comments !== prevProps.comments) {
      this.setState({
        comments: this.props.comments,
        author: '',
        body: '',
      });
    }
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
                <Tag>
                  <Icon type="user" /> {post.author}
                </Tag>
                <Tag>
                  <Icon type="calendar" /> {date}
                </Tag>

                <Tag>
                  Score {this.state.post.voteScore}
                </Tag>

                <ButtonGroup>
                  <Button onClick={() => this.voteHandler(post.id, 'upVote')} size="small" icon="like-o" />
                  <Button onClick={() => this.voteHandler(post.id, 'downVote')} size="small" icon="dislike-o" />
                </ButtonGroup>
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
              <Card key={index} style={{ marginBottom: 20 }}>
                <Avatar icon="user" />
                <h3>{comment.author}</h3>
                <p>{comment.body}</p>

                <br />

                <Tag>
                  Score {comment.voteScore}
                </Tag>

                <ButtonGroup>
                  <Button size="small" icon="like-o" />
                  <Button size="small" icon="dislike-o" />
                </ButtonGroup>

                <div style={{ position: 'absolute', top: 20, right: 20 }}>
                  <Link style={{ marginRight: 15 }} to={`../comment/${comment.id}`}>
                    Edit
                  </Link>
                  <Popconfirm
                    title="Are you sure delete this comment?"
                    onConfirm={() => this.confirmDeleteComment(comment.id, comment.ParentId)}
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
    
        <hr style={{ borderTop: 'none', borderColor: '#dddddd',  marginBottom: 100, marginTop: 100}} />

        <Row>
          <Col span={12} offset={6}>
            <h2>Add a Comment</h2>

            <br />

            <Form style={{ width: '100%' }} layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label="Author">
                <Input
                  name="author"
                  style={{ width: '100%' }}
                  value={this.state.author}
                  onChange={this.handleInputChange}  />
              </FormItem>

              <FormItem label="Body">
                <TextArea
                  name="body"
                  rows={4}
                  style={{ width: '100%' }}
                  value={this.state.body}
                  onChange={this.handleInputChange}  />
              </FormItem>

              <Button htmlType="submit" type="primary" size="large">Add Comment</Button>
            </Form>
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

function mapStateToProps({ comments, post }) {
  return {
    comments,
    post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(dispatchAddComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    getComments: (data) => dispatch(getPostComments(data)),
    get: (data) => dispatch(getPost(data)),
    vote: (id, data) => dispatch(voteForPost(id, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);