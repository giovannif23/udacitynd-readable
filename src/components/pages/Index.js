import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../utils/api';
import { capitalize } from '../utils/helpers';
import PageTemplate from '../templates/PageTemplate';
import Header from '../organisms/Header';
import { Badge, Card, Icon, Input, Select, Tag, Row, Col } from 'antd';

const Option = Select.Option;

class Index extends React.Component {
  state = {
    categories: [],
    posts: [],
    sortValue: 'voteScore',
  };

  sortPosts = (value) => {
    const sortedPosts = this.state.posts.sort((a, b) => {
      var a = a[value];
      var b = b[value];
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
    API.getCategories()
      .then((res) => {
        this.setState({
          categories: res.categories,
        });
      });
    API.getPosts()
      .then((res) => {
        this.setState({
          posts: res,
        });
      });
  }

  render() {
    const { categories, posts, sortValue } = this.state;
    console.log(posts)
    
    return (
      <PageTemplate
        header={<Header/>}>
        <Row style={{marginBottom: 50}}>
          <Col span={12}>
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
          {posts.map((post, index) => (
            <Col className="gutter-row" span={8} key={index}>
              <Card title={<Link to={`post/${post.id}`}>{post.title}</Link>} extra={<Link to={`post/${post.id}/edit`}><Icon style={{ fontSize: 18 }} type="setting" /></Link>} style={{ width: '100%'}}>
                <p>{post.body}</p>
                <br />
                <Link key={index} to={`/${post.category}/posts`}>
                  <Tag color="blue">
                    <Icon type="tag" /> {capitalize(post.category)}
                  </Tag>
                </Link>
                <Tag color="green">
                  <Icon type="like" /> {post.voteScore}
                </Tag>
              </Card>
            </Col>
          ))}
        </Row>
      </PageTemplate>
    );
  }
}

export default Index;