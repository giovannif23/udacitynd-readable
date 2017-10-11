import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { getPosts, voteForPost } from '../../actions';
import { capitalize } from '../utils/helpers';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Button, Card, Icon, Input, Select, Tag, Row, Col, message } from 'antd';

const ButtonGroup = Button.Group;
const Option = Select.Option;

class Index extends React.Component {
  state = {
    categories: [],
    posts: [],
    sortValue: 'voteScore',
  };

  voteHandler = (id, vote) => {
    const voteOption = { option: vote };

    this.props.vote(id, voteOption)
      .then((res) => {
        const { post } = res;
        const { posts } = this.state.posts;
        console.log('POST', post)
        console.log('STATE', this.state)
        message.success(vote);
        this.setState(Object.assign([{}], ...this.state.posts, post))
      });
  }

  sortPosts = (value) => {
    const sortedPosts = this.state.posts.sort((prev, next) => {
      var a = prev[value];
      var b = next[value];
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    this.setState({
      sortValue: value,
      posts: sortedPosts,
    });
  };

  componentDidMount() {
    this.props.get()
      .then((res) => {
        const { posts } = res;
        this.setState({
          posts,
        });
      });

    // static and does not need to be part of store
    API.getCategories()
      .then((res) => {
        this.setState({
          categories: res.categories,
        });
      });
  }

  render() {
    const { categories, sortValue } = this.state;
    
    return (
      <PageTemplate
        header={<Header/>}>
        <Row style={{marginBottom: 50}}>
          <Col span={12} offset={6}>
            <span style={{ marginRight: 5 }}>Sort By:</span> 
            <Select onChange={this.sortPosts} style={{ marginRight: 10, width: 100 }} size="small" defaultValue={sortValue}>
              <Option value="title">Title</Option>
              <Option value="voteScore">Vote Score</Option>
              <Option value="timestamp">Newest</Option>
            </Select>

            {categories.map((category, index) => (
              <Link key={index} to={`/${category.path}/posts`}>
                <Tag color="blue">{capitalize(category.name)}</Tag>
              </Link>
            ))}
          </Col>
        </Row>

        <Row gutter={30}>
          <Col span={12} offset={6}>
            {this.state.posts.map((post, index) => (
              <Card 
                key={index} 
                title={<Link to={`post/${post.id}`}>{post.title}</Link>} 
                extra={<Link to={`post/${post.id}/edit`}> <Icon style={{ fontSize: 18 }} type="setting" /></Link>} 
                style={{ marginBottom: 20, width: '100%'}}>
                <p>{post.body}</p>
                <br />
                <Link key={index} to={`/${post.category}/posts`}>
                  <Tag>
                    <Icon type="tag-o" /> {capitalize(post.category)}
                  </Tag>
                </Link>
                <Tag>
                  Score {post.voteScore}
                </Tag>

                <ButtonGroup>
                  <Button onClick={() => this.voteHandler(post.id, 'upVote')}  size="small" icon="like-o" />
                  <Button onClick={() => this.voteHandler(post.id, 'downVote')}  size="small" icon="dislike-o" />
                </ButtonGroup>
              </Card>
            ))}
          </Col>
        </Row>
      </PageTemplate>
    );
  }
}

function mapStateToProps(posts) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    get: () => dispatch(getPosts()),
    vote: (id, data) => dispatch(voteForPost(id, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);